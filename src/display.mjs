import { loadState, xpForLevel, xpForNextLevel, getLevelTitle } from './engine.mjs';
import { ITEMS, DAILY_QUESTS, QUEST_CHAINS, RARITY } from './data.mjs';

function bar(current, max, width = 20) {
  const ratio = max > 0 ? Math.min(current / max, 1) : 0;
  const filled = Math.floor(ratio * width);
  return '\u{2588}'.repeat(filled) + '\u{2591}'.repeat(width - filled);
}

function statBar(value, maxValue, width = 14) {
  const ratio = maxValue > 0 ? Math.min(value / maxValue, 1) : 0;
  const filled = Math.floor(ratio * width);
  return '\u{2588}'.repeat(filled) + '\u{2591}'.repeat(width - filled);
}

export function showStatus() {
  const state = loadState();
  const nextXP = xpForNextLevel(state.level);
  const currentLevelXP = xpForLevel(state.level);
  const progress = nextXP > currentLevelXP ? state.xp - currentLevelXP : 0;
  const needed = nextXP > currentLevelXP ? nextXP - currentLevelXP : 1;
  const pct = Math.floor((progress / needed) * 100);
  const title = getLevelTitle(state.level);
  const cls = state.class;
  const maxStat = Math.max(...Object.values(state.stats), 1);

  const slots = [
    ['head', '\u{1F451} Head'], ['weapon', '\u{2694}\u{FE0F} Weapon'], ['shield', '\u{1F6E1}\u{FE0F} Shield'],
    ['armor', '\u{1F455} Armor'], ['boots', '\u{1F462} Boots'],
    ['ring1', '\u{1F48D} Ring 1'], ['ring2', '\u{1F48D} Ring 2'], ['amulet', '\u{1F9FF} Amulet'],
  ];

  let o = '';
  o += `\n\u{2694}\u{FE0F}  C L A U D E   R P G  \u{2694}\u{FE0F}\n`;
  o += `\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\n`;
  o += `  ${state.name} \u{2014} Level ${state.level} ${title}\n`;
  o += `  Class: ${cls ? `${cls.icon} ${cls.name} "${cls.title}"` : '\u{2753} Unclassed (keep coding!)'}\n`;
  o += `\n`;
  o += `  XP: ${state.xp.toLocaleString()} / ${nextXP.toLocaleString()}\n`;
  o += `  ${bar(progress, needed)} ${pct}%\n`;
  o += `\n`;
  o += `  \u{1F4CA} Stats:\n`;
  for (const [stat, val] of Object.entries(state.stats)) {
    const label = stat.toUpperCase().padEnd(3);
    const marker = val === maxStat && val > 0 ? ' \u{2605}' : '';
    o += `    ${label} ${statBar(val, maxStat)} ${val}${marker}\n`;
  }

  if (state.streak.current > 0) {
    o += `\n  \u{1F525} Streak: ${state.streak.current} day${state.streak.current > 1 ? 's' : ''} (best: ${state.streak.best}) +${Math.min(state.streak.current * 2, 20)}% XP\n`;
  }

  o += `\n  \u{1F392} Equipment:\n`;
  for (const [slot, label] of slots) {
    const itemId = state.equipment[slot];
    if (itemId) {
      const item = ITEMS.find(i => i.id === itemId);
      const r = RARITY[item?.rarity];
      o += `    ${label}: ${r?.icon || ''} ${item?.icon || ''} ${item?.name || itemId}\n`;
    } else {
      o += `    ${label}: \u{2014}\n`;
    }
  }

  if (state.classHistory.length > 1) {
    o += `\n  \u{1F9EC} Evolution: `;
    o += state.classHistory.map(c => `${c.icon} ${c.name}`).join(' \u{2192} ');
    o += `\n`;
  }

  if (state.notifications?.length > 0) {
    o += `\n  \u{1F4E2} Recent:\n`;
    for (const n of state.notifications.slice(-5)) {
      if (n.type === 'levelup') o += `    \u{1F389} Level Up! ${n.from} \u{2192} ${n.to} (${n.title})\n`;
      else if (n.type === 'classchange') o += `    \u{1F9EC} Class: ${n.from?.name || '?'} \u{2192} ${n.to.icon} ${n.to.name}\n`;
      else if (n.type === 'drop') o += `    \u{1F4B0} Drop: ${RARITY[n.item.rarity]?.icon || ''} ${n.item.icon} ${n.item.name}\n`;
      else if (n.type === 'daily_quest') o += `    \u{2705} Daily: ${n.quest.icon} ${n.quest.name} (+${n.quest.xp} XP)\n`;
      else if (n.type === 'quest_chain') o += `    \u{1F4DC} Quest: ${n.chainIcon} ${n.chainName} Stage ${n.stageNum} complete!\n`;
      else if (n.type === 'quest_reward') o += `    \u{1F381} Quest Reward: ${n.item.icon} ${n.item.name}\n`;
    }
  }

  o += `\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\u{2501}\n`;
  return o;
}

export function showInventory() {
  const state = loadState();
  let o = '\n\u{1F392} Inventory\n';
  o += '\u{2501}'.repeat(34) + '\n';

  if (state.inventory.length === 0) {
    o += '  Empty \u{2014} keep coding to find loot!\n';
  } else {
    let idx = 1;
    const order = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
    for (const rarity of order) {
      const items = state.inventory.filter(i => i.rarity === rarity);
      if (items.length === 0) continue;
      const r = RARITY[rarity];
      o += `\n  ${r.icon} ${r.label}\n`;
      for (const item of items) {
        const bonuses = [];
        if (item.xpBonus) bonuses.push(`XP +${item.xpBonus}%`);
        if (item.statBonus) {
          for (const [s, v] of Object.entries(item.statBonus)) bonuses.push(`${s.toUpperCase()} +${v}%`);
        }
        if (item.dropBonus) bonuses.push(`Drop +${item.dropBonus}%`);
        o += `    [${idx}] ${item.icon} ${item.name} [${item.slot}]${bonuses.length ? ' (' + bonuses.join(', ') + ')' : ''}\n`;
        o += `        "${item.flavor}"\n`;
        idx++;
      }
    }
  }

  o += `\n  Total items: ${state.inventory.length} | Total drops: ${state.totalDrops}\n`;
  o += '\u{2501}'.repeat(34) + '\n';
  return o;
}

export function showQuests() {
  const state = loadState();
  let o = '\n\u{1F4DC} Quests\n';
  o += '\u{2501}'.repeat(34) + '\n';

  for (const chain of QUEST_CHAINS) {
    const qp = state.questProgress[chain.id] || { stage: 0 };
    const done = qp.stage >= chain.stages.length;
    o += `\n  ${chain.icon} ${chain.name}${done ? ' \u{2705}' : ''}\n`;

    for (let i = 0; i < chain.stages.length; i++) {
      const stage = chain.stages[i];
      const total = state.actions[stage.action] || 0;
      if (i < qp.stage) {
        o += `    \u{2705} Stage ${i + 1}: ${stage.desc} (+${stage.xp} XP)\n`;
      } else if (i === qp.stage) {
        const progress = Math.min(total, stage.target);
        o += `    \u{25B6}\u{FE0F} Stage ${i + 1}: ${stage.desc} [${progress}/${stage.target}] (+${stage.xp} XP)\n`;
      } else {
        o += `    \u{1F512} Stage ${i + 1}: ${stage.desc}\n`;
      }
    }
  }

  o += '\u{2501}'.repeat(34) + '\n';
  return o;
}

export function showDaily() {
  const state = loadState();
  const today = new Date().toISOString().split('T')[0];
  const isToday = state.dailyActions.date === today;

  let o = '\n\u{1F4CB} Daily Quests\n';
  o += '\u{2501}'.repeat(34) + '\n';

  if (!isToday) {
    o += '  New day! Start coding to begin daily quests.\n';
  }

  for (const quest of DAILY_QUESTS) {
    const completed = isToday && state.dailyActions.completed?.includes(quest.id);
    const current = isToday ? (state.dailyActions[quest.requirement.action] || 0) : 0;
    const target = quest.requirement.count;
    if (completed) {
      o += `  \u{2705} ${quest.icon} ${quest.name}: ${quest.desc} (+${quest.xp} XP)\n`;
    } else {
      o += `  \u{2B1C} ${quest.icon} ${quest.name}: ${quest.desc} [${current}/${target}] (+${quest.xp} XP)\n`;
    }
  }

  if (state.streak.current > 0) {
    o += `\n  \u{1F525} Streak: ${state.streak.current} days (+${Math.min(state.streak.current * 2, 20)}% XP bonus)\n`;
  }

  o += '\u{2501}'.repeat(34) + '\n';
  return o;
}

export function showHistory() {
  const state = loadState();
  let o = '\n\u{1F9EC} Class Evolution\n';
  o += '\u{2501}'.repeat(34) + '\n';

  if (state.classHistory.length === 0) {
    o += '  No class yet \u{2014} keep coding!\n';
  } else {
    for (const c of state.classHistory) {
      const date = c.date?.split('T')[0] || '?';
      o += `  Lv${c.level} ${c.icon} ${c.name} "${c.title}" (${date})\n`;
    }
    o += `\n  ${state.classHistory.map(c => c.icon).join(' \u{2192} ')}\n`;
  }

  o += '\u{2501}'.repeat(34) + '\n';
  return o;
}

export function showHelp() {
  let o = '\n\u{2694}\u{FE0F} Claude RPG \u{2014} Commands\n';
  o += '\u{2501}'.repeat(34) + '\n';
  o += '  /rpg              Character status\n';
  o += '  /rpg inventory    View inventory\n';
  o += '  /rpg equip <name> Equip an item\n';
  o += '  /rpg unequip <slot> Unequip a slot\n';
  o += '  /rpg quests       Quest progress\n';
  o += '  /rpg daily        Daily quests\n';
  o += '  /rpg history      Class evolution\n';
  o += '  /rpg help         This help\n';
  o += '\u{2501}'.repeat(34) + '\n';
  return o;
}
