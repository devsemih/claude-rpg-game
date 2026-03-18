# claude-rpg

Turn your coding sessions into an RPG adventure. Earn XP, level up, collect loot, and evolve your class — all while coding with [Claude Code](https://docs.anthropic.com/en/docs/claude-code).

```
⚔️  C L A U D E   R P G  ⚔️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Semih — Level 12 Adept
  Class: 🧙🛡️ Battle Mage "Refactor & Test"

  XP: 2,847 / 3,500
  ████████████████░░░░ 81%

  📊 Stats:
    STR ████████░░░░░░ 52
    INT ████████████░░ 89 ★
    DEX █████░░░░░░░░░ 34
    WIS ██████████░░░░ 71
    CON ███████████░░░ 78

  🔥 Streak: 5 days (best: 12) +10% XP

  🎒 Equipment:
    👑 Head: 🔵 🎧 Noise Cancelling Helm
    ⚔️ Weapon: 🟢 ⌨️ Mechanical Keyboard
    👕 Armor: 🔵 🦇 Dark Theme Cape
    🧿 Amulet: 🟢 ☕ Enchanted Coffee Mug

  🧬 Evolution: 🧙 Wizard → 🧙🏹 Sage → 🧙🛡️ Battle Mage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## How It Works

claude-rpg runs as a **PostToolUse hook** in Claude Code. Every time Claude edits a file, reads code, runs tests, or makes a commit, the hook fires in the background and awards XP — with **zero context consumption**.

```
You write code with Claude Code
  → Claude uses a tool (Edit, Read, Bash, etc.)
  → Hook fires silently in the background (~37ms)
  → XP gained, stats updated, maybe an item drops
  → You type /rpg to check your character
```

Claude never sees the RPG system. It doesn't consume tokens or slow down your work.

## Install

```bash
npm install -g claude-rpg
claude-rpg install
```

Then restart Claude Code. That's it.

`install` automatically:
- Creates `~/.claude-rpg/` for your save data
- Adds the `/rpg` command to Claude Code
- Configures the PostToolUse hook in `~/.claude/settings.json`

## Commands

Inside Claude Code:

```
/rpg                  Character status
/rpg inventory        View your loot
/rpg equip <#|name>   Equip an item by slot number or name
/rpg unequip <#|slot> Unequip by slot number or name
/rpg quests           Quest chain progress
/rpg daily            Daily quests
/rpg history          Class evolution timeline
```

Or directly from terminal:

```bash
claude-rpg status
claude-rpg inventory
claude-rpg equip 1
claude-rpg unequip 6
claude-rpg quests
claude-rpg daily
claude-rpg history
```

## Dynamic Class System

You don't pick a class — **your class picks you**. Every action builds one of 5 stats:

| Stat | Source |
|------|--------|
| **STR** | Commits, file creation, builds |
| **INT** | Edits, refactoring, bug fixes |
| **DEX** | Quick fixes, small changes |
| **WIS** | File reads, grep, code exploration |
| **CON** | Running tests |

Your dominant stat determines your class. If two stats are close, you get a **hybrid class**:

| Class | Type | Playstyle |
|-------|------|-----------|
| ⚔️ Warrior | STR | The Builder |
| 🧙 Wizard | INT | The Refactorer |
| 🗡️ Rogue | DEX | The Quick Fixer |
| 🏹 Ranger | WIS | The Explorer |
| 🛡️ Paladin | CON | The Guardian |
| ⚔️🛡️ Dark Knight | STR+CON | Build & Test |
| 🧙🏹 Sage | INT+WIS | Research & Refactor |
| 🗡️🧙 Spellblade | DEX+INT | Quick & Smart |
| ⚔️🗡️ Berserker | STR+DEX | Fast Shipper |
| 🧙🛡️ Battle Mage | INT+CON | Refactor & Test |
| ...and 5 more hybrids | | |

Your class evolves over time as your coding style changes.

## Loot System

Items drop randomly after tool uses. Higher levels unlock rarer drops.

**5 rarity tiers:** ⬜ Common → 🟢 Uncommon → 🔵 Rare → 🟣 Epic → 🟠 Legendary

**8 equipment slots:** Head, Weapon, Shield, Armor, Boots, Ring ×2, Amulet

Items give bonuses like XP +%, stat +%, or drop rate +%. Examples:

| Item | Rarity | Slot | Effect |
|------|--------|------|--------|
| 🦆 Rubber Duck | ⬜ | Amulet | XP +5% |
| ⌨️ Mechanical Keyboard | 🟢 | Weapon | INT +10%, XP +5% |
| 🦇 Dark Theme Cape | 🔵 | Armor | XP +12%, INT +8% |
| ⚔️ Mass Formatter | 🟣 | Weapon | INT +20%, XP +20% |
| 🔱 The Mass Deployer | 🟠 | Weapon | STR +25%, INT +15%, XP +30% |

33 items total across all slots and rarities.

## Quests

### Daily Quests
Reset every day. Quick tasks for bonus XP:

- 🩸 **First Blood** — Make your first edit today (+50 XP)
- 🔥 **Warm Up** — Edit 5 files (+30 XP)
- 📦 **Committer** — Make 3 commits (+40 XP)
- 📖 **Bookworm** — Read 10 files (+25 XP)
- 🧪 **Test Runner** — Run 3 tests (+60 XP)

### Quest Chains
Long-term goals with item rewards at each stage:

- 📜 **The Refactoring Saga** — Edit 10/25/50 files
- 🏃 **The Commit Marathon** — 10/25/50 commits
- 🗺️ **The Explorer's Path** — Read 50/100/200 files
- 🧪 **The Test Guardian** — Run 10/25/50 tests
- 🏗️ **The Builder** — Create 5/15/30 files

## Streak System

Code on consecutive days to build a streak. Each day adds +2% XP bonus, up to +20%.

## Uninstall

```bash
claude-rpg uninstall
npm uninstall -g claude-rpg
```

Your save data stays in `~/.claude-rpg/` — delete it manually if you want a fresh start.

## Requirements

- Node.js 18+
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code)

## License

MIT
