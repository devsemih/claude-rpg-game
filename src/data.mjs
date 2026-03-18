// === ITEMS ===
export const ITEMS = [
  // Common
  { id: 'rubber_duck', name: 'Rubber Duck', slot: 'amulet', rarity: 'common', icon: '\u{1F986}', xpBonus: 5, flavor: "Every debugger's best friend" },
  { id: 'sticky_notes', name: 'Sticky Notes', slot: 'shield', rarity: 'common', icon: '\u{1F4DD}', statBonus: { wis: 5 }, flavor: 'TODO: remove these' },
  { id: 'energy_drink', name: 'Energy Drink', slot: 'amulet', rarity: 'common', icon: '\u{1F964}', xpBonus: 3, flavor: 'Tastes like deadlines' },
  { id: 'old_sneakers', name: 'Old Sneakers', slot: 'boots', rarity: 'common', icon: '\u{1F45F}', statBonus: { dex: 5 }, flavor: 'Comfortable for long sessions' },
  { id: 'baseball_cap', name: 'Baseball Cap', slot: 'head', rarity: 'common', icon: '\u{1F9E2}', statBonus: { str: 5 }, flavor: 'Backwards, naturally' },
  { id: 'hoodie', name: 'Dev Hoodie', slot: 'armor', rarity: 'common', icon: '\u{1F9E5}', xpBonus: 3, flavor: 'The uniform' },
  { id: 'plastic_ring', name: 'Plastic Ring', slot: 'ring', rarity: 'common', icon: '\u{1F48D}', xpBonus: 2, flavor: 'From a cereal box' },

  // Uncommon
  { id: 'mech_keyboard', name: 'Mechanical Keyboard', slot: 'weapon', rarity: 'uncommon', icon: '\u{2328}\u{FE0F}', statBonus: { int: 10 }, xpBonus: 5, flavor: 'Click clack click clack' },
  { id: 'standing_mat', name: 'Standing Desk Mat', slot: 'boots', rarity: 'uncommon', icon: '\u{1F9F1}', statBonus: { con: 10 }, flavor: 'For the health-conscious coder' },
  { id: 'blue_glasses', name: 'Blue Light Glasses', slot: 'head', rarity: 'uncommon', icon: '\u{1F453}', statBonus: { wis: 10 }, flavor: 'See the code clearly' },
  { id: 'usb_hub', name: 'USB Hub of Power', slot: 'shield', rarity: 'uncommon', icon: '\u{1F50C}', xpBonus: 8, flavor: 'More ports, more power' },
  { id: 'coffee_mug', name: 'Enchanted Coffee Mug', slot: 'amulet', rarity: 'uncommon', icon: '\u{2615}', xpBonus: 10, flavor: 'Never empty, somehow' },
  { id: 'silver_ring', name: 'Silver Ring', slot: 'ring', rarity: 'uncommon', icon: '\u{1F48D}', xpBonus: 8, flavor: 'Polished to a mirror shine' },
  { id: 'cargo_pants', name: 'Cargo Pants of Holding', slot: 'armor', rarity: 'uncommon', icon: '\u{1F456}', statBonus: { str: 8 }, xpBonus: 5, flavor: 'So many pockets' },

  // Rare
  { id: 'dark_cape', name: 'Dark Theme Cape', slot: 'armor', rarity: 'rare', icon: '\u{1F987}', xpBonus: 12, statBonus: { int: 8 }, flavor: 'Light theme users fear you' },
  { id: 'ergo_mouse', name: 'Ergonomic Mouse', slot: 'weapon', rarity: 'rare', icon: '\u{1F5B1}\u{FE0F}', statBonus: { dex: 15 }, xpBonus: 8, flavor: 'Perfectly contoured' },
  { id: 'noise_helm', name: 'Noise Cancelling Helm', slot: 'head', rarity: 'rare', icon: '\u{1F3A7}', statBonus: { int: 12, wis: 8 }, flavor: 'The world fades away' },
  { id: 'test_shield', name: 'Shield of Green Tests', slot: 'shield', rarity: 'rare', icon: '\u{1F6E1}\u{FE0F}', statBonus: { con: 15 }, xpBonus: 10, flavor: 'All tests passing' },
  { id: 'sprint_boots', name: 'Sprint Boots', slot: 'boots', rarity: 'rare', icon: '\u{1F462}', statBonus: { dex: 12, str: 8 }, flavor: 'Ship it!' },
  { id: 'jade_ring', name: 'Jade Ring', slot: 'ring', rarity: 'rare', icon: '\u{1F49A}', xpBonus: 12, statBonus: { wis: 10 }, flavor: 'Ancient wisdom embedded' },

  // Epic
  { id: 'formatter', name: 'Mass Formatter', slot: 'weapon', rarity: 'epic', icon: '\u{2694}\u{FE0F}', statBonus: { int: 20 }, xpBonus: 20, flavor: 'One command to format them all' },
  { id: 'architect_robe', name: "Architect's Robe", slot: 'armor', rarity: 'epic', icon: '\u{1F458}', xpBonus: 18, statBonus: { int: 12, wis: 12 }, flavor: 'Patterns within patterns' },
  { id: 'pr_crown', name: 'Crown of PRs', slot: 'head', rarity: 'epic', icon: '\u{1F451}', statBonus: { str: 18 }, xpBonus: 15, flavor: 'All PRs approved on first review' },
  { id: 'cicd_boots', name: 'Boots of CI/CD', slot: 'boots', rarity: 'epic', icon: '\u{1F680}', statBonus: { con: 18 }, xpBonus: 15, flavor: 'Pipeline never fails' },
  { id: 'auto_ring', name: 'Ring of Automation', slot: 'ring', rarity: 'epic', icon: '\u{2699}\u{FE0F}', xpBonus: 20, flavor: 'Why do it twice?' },
  { id: 'so_amulet', name: 'Amulet of Stack Overflow', slot: 'amulet', rarity: 'epic', icon: '\u{1F4DC}', statBonus: { wis: 20 }, xpBonus: 18, flavor: 'Marked as duplicate' },

  // Legendary
  { id: 'deployer', name: 'The Mass Deployer', slot: 'weapon', rarity: 'legendary', icon: '\u{1F531}', statBonus: { str: 25, int: 15 }, xpBonus: 30, flavor: 'Deploy on Friday? No fear.' },
  { id: 'clean_armor', name: 'Armor of Clean Code', slot: 'armor', rarity: 'legendary', icon: '\u{2728}', statBonus: { int: 25, con: 15 }, xpBonus: 25, flavor: 'Zero warnings, zero debt' },
  { id: 'os_crown', name: 'Crown of Open Source', slot: 'head', rarity: 'legendary', icon: '\u{1F31F}', xpBonus: 30, dropBonus: 10, flavor: '10k stars on GitHub' },
  { id: 'ten_x_amulet', name: 'Amulet of 10x', slot: 'amulet', rarity: 'legendary', icon: '\u{1F48E}', xpBonus: 35, flavor: 'Myth or reality?' },
  { id: 'legacy_ring', name: 'One Ring to Refactor', slot: 'ring', rarity: 'legendary', icon: '\u{1F300}', statBonus: { int: 20, dex: 15 }, xpBonus: 25, flavor: 'One ring to find bugs, one ring to fix them' },
];

// === CLASSES ===
export const SINGLE_CLASSES = {
  str: { name: 'Warrior', icon: '\u{2694}\u{FE0F}', title: 'The Builder' },
  int: { name: 'Wizard', icon: '\u{1F9D9}', title: 'The Refactorer' },
  dex: { name: 'Rogue', icon: '\u{1F5E1}\u{FE0F}', title: 'The Quick Fixer' },
  wis: { name: 'Ranger', icon: '\u{1F3F9}', title: 'The Explorer' },
  con: { name: 'Paladin', icon: '\u{1F6E1}\u{FE0F}', title: 'The Guardian' },
};

export const HYBRID_CLASSES = {
  'str+con': { name: 'Dark Knight', icon: '\u{2694}\u{FE0F}\u{1F6E1}\u{FE0F}', title: 'Build & Test' },
  'int+wis': { name: 'Sage', icon: '\u{1F9D9}\u{1F3F9}', title: 'Research & Refactor' },
  'dex+int': { name: 'Spellblade', icon: '\u{1F5E1}\u{FE0F}\u{1F9D9}', title: 'Quick & Smart' },
  'str+dex': { name: 'Berserker', icon: '\u{2694}\u{FE0F}\u{1F5E1}\u{FE0F}', title: 'Fast Shipper' },
  'wis+con': { name: 'Monk', icon: '\u{1F3F9}\u{1F6E1}\u{FE0F}', title: 'Careful & Solid' },
  'int+con': { name: 'Battle Mage', icon: '\u{1F9D9}\u{1F6E1}\u{FE0F}', title: 'Refactor & Test' },
  'str+int': { name: 'Paladin King', icon: '\u{2694}\u{FE0F}\u{1F9D9}', title: 'Build & Polish' },
  'str+wis': { name: 'Warden', icon: '\u{2694}\u{FE0F}\u{1F3F9}', title: 'Build & Explore' },
  'dex+con': { name: 'Shadow Knight', icon: '\u{1F5E1}\u{FE0F}\u{1F6E1}\u{FE0F}', title: 'Quick & Tested' },
  'dex+wis': { name: 'Scout', icon: '\u{1F5E1}\u{FE0F}\u{1F3F9}', title: 'Quick & Curious' },
};

// === LEVEL TITLES ===
export const LEVEL_TITLES = [
  [1, 'Apprentice'],
  [5, 'Journeyman'],
  [10, 'Adept'],
  [15, 'Expert'],
  [20, 'Master'],
  [25, 'Grandmaster'],
  [30, 'Legend'],
];

// === QUESTS ===
export const DAILY_QUESTS = [
  { id: 'first_blood', name: 'First Blood', desc: 'Make your first edit today', requirement: { action: 'edits', count: 1 }, xp: 50, icon: '\u{1FA78}' },
  { id: 'warm_up', name: 'Warm Up', desc: 'Edit 5 files', requirement: { action: 'edits', count: 5 }, xp: 30, icon: '\u{1F525}' },
  { id: 'committer', name: 'Committer', desc: 'Make 3 commits', requirement: { action: 'commits', count: 3 }, xp: 40, icon: '\u{1F4E6}' },
  { id: 'bookworm', name: 'Bookworm', desc: 'Read 10 files', requirement: { action: 'reads', count: 10 }, xp: 25, icon: '\u{1F4D6}' },
  { id: 'test_runner', name: 'Test Runner', desc: 'Run 3 tests', requirement: { action: 'tests', count: 3 }, xp: 60, icon: '\u{1F9EA}' },
];

export const QUEST_CHAINS = [
  {
    id: 'refactoring_saga', name: 'The Refactoring Saga', icon: '\u{1F4DC}',
    stages: [
      { target: 10, action: 'edits', xp: 100, reward: 'mech_keyboard', desc: 'Edit 10 files' },
      { target: 25, action: 'edits', xp: 200, reward: 'test_shield', desc: 'Edit 25 files' },
      { target: 50, action: 'edits', xp: 500, reward: 'formatter', desc: 'Edit 50 files' },
    ],
  },
  {
    id: 'commit_marathon', name: 'The Commit Marathon', icon: '\u{1F3C3}',
    stages: [
      { target: 10, action: 'commits', xp: 150, reward: 'standing_mat', desc: '10 commits' },
      { target: 25, action: 'commits', xp: 300, reward: 'sprint_boots', desc: '25 commits' },
      { target: 50, action: 'commits', xp: 800, reward: 'pr_crown', desc: '50 commits' },
    ],
  },
  {
    id: 'explorer_path', name: "The Explorer's Path", icon: '\u{1F5FA}\u{FE0F}',
    stages: [
      { target: 50, action: 'reads', xp: 100, reward: 'blue_glasses', desc: 'Read 50 files' },
      { target: 100, action: 'reads', xp: 250, reward: 'noise_helm', desc: 'Read 100 files' },
      { target: 200, action: 'reads', xp: 600, reward: 'so_amulet', desc: 'Read 200 files' },
    ],
  },
  {
    id: 'test_guardian', name: 'The Test Guardian', icon: '\u{1F9EA}',
    stages: [
      { target: 10, action: 'tests', xp: 150, reward: 'coffee_mug', desc: 'Run 10 tests' },
      { target: 25, action: 'tests', xp: 350, reward: 'cicd_boots', desc: 'Run 25 tests' },
      { target: 50, action: 'tests', xp: 900, reward: 'clean_armor', desc: 'Run 50 tests' },
    ],
  },
  {
    id: 'builder', name: 'The Builder', icon: '\u{1F3D7}\u{FE0F}',
    stages: [
      { target: 5, action: 'writes', xp: 100, reward: 'hoodie', desc: 'Create 5 files' },
      { target: 15, action: 'writes', xp: 250, reward: 'cargo_pants', desc: 'Create 15 files' },
      { target: 30, action: 'writes', xp: 700, reward: 'deployer', desc: 'Create 30 files' },
    ],
  },
];

// === TOOL → ACTION MAPPING ===
export const TOOL_ACTIONS = {
  Edit:  { action: 'edits',    xp: 5,  stats: { int: 2 } },
  Write: { action: 'writes',   xp: 10, stats: { str: 2, int: 1 } },
  Read:  { action: 'reads',    xp: 3,  stats: { wis: 2 } },
  Grep:  { action: 'searches', xp: 3,  stats: { wis: 2 } },
  Glob:  { action: 'searches', xp: 2,  stats: { wis: 1 } },
  Agent: { action: 'searches', xp: 5,  stats: { wis: 2, int: 1 } },
  Bash:  { action: 'bash',     xp: 5,  stats: { str: 1, dex: 1 } },
};

// Bash command subtypes (override default Bash mapping)
export const BASH_SUBTYPES = [
  { pattern: /\b(git\s+commit|git\s+push)\b/i, action: 'commits', xp: 15, stats: { str: 3, con: 1 } },
  { pattern: /\b(npm\s+test|yarn\s+test|pnpm\s+test|jest|pytest|vitest|cargo\s+test|go\s+test|swift\s+test|xcodebuild\s+test)\b/i, action: 'tests', xp: 20, stats: { con: 4 } },
  { pattern: /\b(npm\s+run\s+build|yarn\s+build|cargo\s+build|go\s+build|swift\s+build|make\b|xcodebuild\b)/i, action: 'builds', xp: 10, stats: { str: 2, con: 1 } },
];

// === RARITY CONFIG ===
export const RARITY = {
  common:    { icon: '\u{2B1C}', label: 'COMMON' },
  uncommon:  { icon: '\u{1F7E2}', label: 'UNCOMMON' },
  rare:      { icon: '\u{1F535}', label: 'RARE' },
  epic:      { icon: '\u{1F7E3}', label: 'EPIC' },
  legendary: { icon: '\u{1F7E0}', label: 'LEGENDARY' },
};
