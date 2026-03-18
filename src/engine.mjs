import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { execSync } from 'child_process';
import {
  ITEMS, TOOL_ACTIONS, BASH_SUBTYPES,
  SINGLE_CLASSES, HYBRID_CLASSES, LEVEL_TITLES,
  DAILY_QUESTS, QUEST_CHAINS,
} from './data.mjs';

const STATE_DIR = join(homedir(), '.claude-rpg');
const STATE_FILE = join(STATE_DIR, 'state.json');

// === STATE ===

function defaultState() {
  let name = 'Adventurer';
  try { name = execSync('git config user.name', { encoding: 'utf8', timeout: 2000 }).trim() || name; } catch {}

  return {
    version: 1,
    created: new Date().toISOString(),
    name,
    level: 1,
    xp: 0,
    stats: { str: 0, int: 0, dex: 0, wis: 0, con: 0 },
    class: null,
    classHistory: [],
    equipment: { head: null, weapon: null, shield: null, armor: null, boots: null, ring1: null, ring2: null, amulet: null },
    inventory: [],
    actions: { edits: 0, writes: 0, commits: 0, reads: 0, searches: 0, tests: 0, builds: 0, bash: 0 },
    dailyActions: { date: null, edits: 0, writes: 0, commits: 0, reads: 0, searches: 0, tests: 0, builds: 0, bash: 0, completed: [] },
    questProgress: {},
    streak: { current: 0, best: 0, lastDate: null },
    notifications: [],
    totalDrops: 0,
  };
}

export function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  if (!existsSync(STATE_DIR)) mkdirSync(STATE_DIR, { recursive: true });
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// === XP & LEVELS ===

export function xpForLevel(level) {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level - 1, 2));
}

export function xpForNextLevel(level) {
  return xpForLevel(level + 1);
}

// === EQUIPMENT BONUSES ===

function getEquippedItems(equipment) {
  const items = [];
  for (const itemId of Object.values(equipment)) {
    if (!itemId) continue;
    const item = ITEMS.find(i => i.id === itemId);
    if (item) items.push(item);
  }
  return items;
}

function getXPBonus(equipment) {
  let bonus = 0;
  for (const item of getEquippedItems(equipment)) {
    if (item.xpBonus) bonus += item.xpBonus;
  }
  return bonus;
}

function getDropBonus(equipment) {
  let bonus = 0;
  for (const item of getEquippedItems(equipment)) {
    if (item.dropBonus) bonus += item.dropBonus;
  }
  return bonus;
}

function getStatBonuses(equipment) {
  const bonuses = { str: 0, int: 0, dex: 0, wis: 0, con: 0 };
  for (const item of getEquippedItems(equipment)) {
    if (item.statBonus) {
      for (const [stat, val] of Object.entries(item.statBonus)) {
        bonuses[stat] += val;
      }
    }
  }
  return bonuses;
}

// === CLASS ===

export function determineClass(stats) {
  const entries = Object.entries(stats).filter(([, v]) => v > 0);
  if (entries.length === 0) return null;

  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const [primary, primaryVal] = sorted[0];

  if (sorted.length < 2 || primaryVal === 0) {
    return SINGLE_CLASSES[primary] || null;
  }

  const [secondary, secondaryVal] = sorted[1];

  if (secondaryVal >= primaryVal * 0.8) {
    const key1 = `${primary}+${secondary}`;
    const key2 = `${secondary}+${primary}`;
    return HYBRID_CLASSES[key1] || HYBRID_CLASSES[key2] || SINGLE_CLASSES[primary];
  }

  return SINGLE_CLASSES[primary];
}

export function getLevelTitle(level) {
  let title = 'Apprentice';
  for (const [minLevel, t] of LEVEL_TITLES) {
    if (level >= minLevel) title = t;
  }
  return title;
}

// === ITEM DROPS ===

function rollItemDrop(level, dropBonus) {
  const chance = 0.08 + dropBonus / 100;
  if (Math.random() > chance) return null;

  let weights;
  if (level >= 25)      weights = [20, 25, 25, 20, 10];
  else if (level >= 20) weights = [30, 30, 25, 15, 0];
  else if (level >= 10) weights = [50, 35, 15, 0, 0];
  else if (level >= 5)  weights = [70, 30, 0, 0, 0];
  else                  weights = [100, 0, 0, 0, 0];

  const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
  const roll = Math.random() * 100;
  let cumulative = 0;
  let rarity = 'common';
  for (let i = 0; i < rarities.length; i++) {
    cumulative += weights[i];
    if (roll < cumulative) { rarity = rarities[i]; break; }
  }

  const pool = ITEMS.filter(i => i.rarity === rarity);
  if (pool.length === 0) return null;
  return { ...pool[Math.floor(Math.random() * pool.length)] };
}

// === DAILY & STREAK ===

function updateDaily(state, actionType) {
  const today = new Date().toISOString().split('T')[0];

  if (state.dailyActions.date !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (state.streak.lastDate === yesterday) {
      state.streak.current++;
    } else if (state.streak.lastDate !== today) {
      state.streak.current = 1;
    }
    state.streak.lastDate = today;
    state.streak.best = Math.max(state.streak.best, state.streak.current);
    state.dailyActions = { date: today, edits: 0, writes: 0, commits: 0, reads: 0, searches: 0, tests: 0, builds: 0, bash: 0, completed: [] };
  }

  if (actionType in state.dailyActions && typeof state.dailyActions[actionType] === 'number') {
    state.dailyActions[actionType]++;
  }
}

// === MAIN HOOK HANDLER ===

export function processToolUse(toolName, toolInput) {
  const state = loadState();

  let mapping = TOOL_ACTIONS[toolName];

  if (toolName === 'Bash' && toolInput?.command) {
    for (const sub of BASH_SUBTYPES) {
      if (sub.pattern.test(toolInput.command)) {
        mapping = { action: sub.action, xp: sub.xp, stats: sub.stats };
        break;
      }
    }
  }

  if (!mapping) return;

  // Action counts
  state.actions[mapping.action] = (state.actions[mapping.action] || 0) + 1;

  // Daily tracking
  updateDaily(state, mapping.action);

  // XP with bonuses
  const xpBonus = getXPBonus(state.equipment);
  const streakBonus = Math.min((state.streak.current || 0) * 2, 20);
  const earnedXP = Math.floor(mapping.xp * (1 + (xpBonus + streakBonus) / 100));
  state.xp += earnedXP;

  // Stat gains with bonuses
  const statBonuses = getStatBonuses(state.equipment);
  for (const [stat, val] of Object.entries(mapping.stats)) {
    const bonus = statBonuses[stat] || 0;
    state.stats[stat] = (state.stats[stat] || 0) + Math.floor(val * (1 + bonus / 100));
  }

  // Level up check
  const oldLevel = state.level;
  while (state.xp >= xpForNextLevel(state.level)) {
    state.level++;
  }
  if (state.level > oldLevel) {
    state.notifications.push({ type: 'levelup', from: oldLevel, to: state.level, title: getLevelTitle(state.level) });
  }

  // Class evolution check
  const newClass = determineClass(state.stats);
  if (newClass && (!state.class || state.class.name !== newClass.name)) {
    const oldClass = state.class;
    state.class = newClass;
    state.classHistory.push({ ...newClass, level: state.level, date: new Date().toISOString() });
    state.notifications.push({ type: 'classchange', from: oldClass, to: newClass });
  }

  // Item drop
  const dropBonus = getDropBonus(state.equipment);
  const drop = rollItemDrop(state.level, dropBonus);
  if (drop) {
    state.inventory.push({ ...drop, obtainedAt: new Date().toISOString() });
    state.totalDrops++;
    state.notifications.push({ type: 'drop', item: drop });
  }

  // Daily quests
  for (const quest of DAILY_QUESTS) {
    if (state.dailyActions.completed?.includes(quest.id)) continue;
    const current = state.dailyActions[quest.requirement.action] || 0;
    if (current >= quest.requirement.count) {
      state.dailyActions.completed.push(quest.id);
      state.xp += quest.xp;
      state.notifications.push({ type: 'daily_quest', quest });
    }
  }

  // Quest chains
  for (const chain of QUEST_CHAINS) {
    if (!state.questProgress[chain.id]) {
      state.questProgress[chain.id] = { stage: 0 };
    }
    const qp = state.questProgress[chain.id];
    if (qp.stage >= chain.stages.length) continue;

    const stage = chain.stages[qp.stage];
    const total = state.actions[stage.action] || 0;

    if (total >= stage.target) {
      qp.stage++;
      state.xp += stage.xp;
      if (stage.reward) {
        const item = ITEMS.find(i => i.id === stage.reward);
        if (item && !state.inventory.some(i => i.id === item.id)) {
          state.inventory.push({ ...item, obtainedAt: new Date().toISOString() });
          state.notifications.push({ type: 'quest_reward', item, chainName: chain.name });
        }
      }
      state.notifications.push({ type: 'quest_chain', chainName: chain.name, chainIcon: chain.icon, stageNum: qp.stage });
    }
  }

  // Cap notifications
  if (state.notifications.length > 20) {
    state.notifications = state.notifications.slice(-20);
  }

  saveState(state);
}

// === EQUIP / UNEQUIP ===

const RARITY_ORDER = ['legendary', 'epic', 'rare', 'uncommon', 'common'];

function getSortedInventory(inventory) {
  const sorted = [];
  for (const rarity of RARITY_ORDER) {
    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].rarity === rarity) sorted.push({ item: inventory[i], originalIdx: i });
    }
  }
  return sorted;
}

export function equipItem(input) {
  const state = loadState();
  let idx;

  const num = parseInt(input, 10);
  if (!isNaN(num) && num >= 1) {
    const sorted = getSortedInventory(state.inventory);
    if (num > sorted.length) return { success: false, message: `No item at slot [${num}]. You have ${sorted.length} items.` };
    idx = sorted[num - 1].originalIdx;
  } else {
    idx = state.inventory.findIndex(i => i.name.toLowerCase() === input.toLowerCase());
  }

  if (idx === -1) return { success: false, message: `"${input}" not found in inventory.` };

  const item = state.inventory[idx];
  let slot = item.slot;

  if (slot === 'ring') {
    slot = state.equipment.ring1 === null ? 'ring1' : 'ring2';
  }

  if (state.equipment[slot]) {
    const currentItem = ITEMS.find(i => i.id === state.equipment[slot]);
    if (currentItem) {
      state.inventory.push({ ...currentItem, obtainedAt: new Date().toISOString() });
    }
  }

  state.equipment[slot] = item.id;
  state.inventory.splice(idx, 1);
  saveState(state);

  return { success: true, message: `Equipped ${item.icon} ${item.name} → ${slot}` };
}

const SLOT_ORDER = ['head', 'weapon', 'shield', 'armor', 'boots', 'ring1', 'ring2', 'amulet'];

export function unequipSlot(input) {
  const num = parseInt(input, 10);
  const slotName = (!isNaN(num) && num >= 1 && num <= SLOT_ORDER.length) ? SLOT_ORDER[num - 1] : input;

  const state = loadState();
  if (!state.equipment[slotName]) return { success: false, message: `Nothing equipped in ${slotName}.` };

  const itemId = state.equipment[slotName];
  const item = ITEMS.find(i => i.id === itemId);
  if (item) {
    state.inventory.push({ ...item, obtainedAt: new Date().toISOString() });
  }
  state.equipment[slotName] = null;
  saveState(state);

  return { success: true, message: `Unequipped ${item?.icon || ''} ${item?.name || itemId} from ${slotName}` };
}
