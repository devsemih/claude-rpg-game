#!/usr/bin/env node

import { readFileSync, existsSync, mkdirSync, copyFileSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { processToolUse, equipItem, unequipSlot, loadState, saveState } from '../src/engine.mjs';
import { showStatus, showInventory, showQuests, showDaily, showHistory, showHelp } from '../src/display.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const command = process.argv[2];

switch (command) {
  case 'hook': {
    let input = '';
    try { input = readFileSync('/dev/stdin', 'utf8'); } catch { break; }
    try {
      const data = JSON.parse(input);
      processToolUse(data.tool_name, data.tool_input);
    } catch {
      // Fail silently — never break user's workflow
    }
    break;
  }

  case 'status':
  case undefined: {
    process.stdout.write(showStatus());
    // Clear notifications after display
    const state = loadState();
    state.notifications = [];
    saveState(state);
    break;
  }

  case 'inventory':
  case 'inv':
    process.stdout.write(showInventory());
    break;

  case 'equip': {
    const name = process.argv.slice(3).join(' ');
    if (!name) { console.log('Usage: claude-rpg equip <item name>'); break; }
    console.log(equipItem(name).message);
    break;
  }

  case 'unequip': {
    const slot = process.argv[3];
    if (!slot) { console.log('Usage: claude-rpg unequip <slot>'); break; }
    console.log(unequipSlot(slot).message);
    break;
  }

  case 'quests':
    process.stdout.write(showQuests());
    break;

  case 'daily':
    process.stdout.write(showDaily());
    break;

  case 'history':
    process.stdout.write(showHistory());
    break;

  case 'install': {
    // 1. State directory
    const stateDir = join(homedir(), '.claude-rpg');
    if (!existsSync(stateDir)) mkdirSync(stateDir, { recursive: true });
    const state = loadState();
    saveState(state);
    console.log('\u{2705} State directory: ~/.claude-rpg/');

    // 2. Custom command
    const commandsDir = join(homedir(), '.claude', 'commands');
    if (!existsSync(commandsDir)) mkdirSync(commandsDir, { recursive: true });
    const cmdSrc = join(__dirname, '..', 'commands', 'rpg.md');
    const cmdDest = join(commandsDir, 'rpg.md');
    if (existsSync(cmdSrc)) {
      copyFileSync(cmdSrc, cmdDest);
      console.log('\u{2705} Command installed: /rpg');
    }

    // 3. Hook config
    const settingsPath = join(homedir(), '.claude', 'settings.json');
    let settings = {};
    try { settings = JSON.parse(readFileSync(settingsPath, 'utf8')); } catch {}

    if (!settings.hooks) settings.hooks = {};
    if (!settings.hooks.PostToolUse) settings.hooks.PostToolUse = [];

    const alreadyInstalled = settings.hooks.PostToolUse.some(h =>
      h.hooks?.some(hh => hh.command?.includes('claude-rpg'))
    );

    if (!alreadyInstalled) {
      settings.hooks.PostToolUse.push({
        matcher: 'Edit|Write|Bash|Read|Grep|Glob|Agent',
        hooks: [{ type: 'command', command: 'claude-rpg hook' }],
      });
      writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      console.log('\u{2705} Hook added to ~/.claude/settings.json');
    } else {
      console.log('\u{2139}\u{FE0F}  Hook already configured');
    }

    console.log('\n\u{2694}\u{FE0F}  claude-rpg is ready!');
    console.log('\u{26A0}\u{FE0F}  Restart Claude Code for the hook to take effect.');
    console.log('   Then use /rpg to see your character.\n');
    break;
  }

  case 'uninstall': {
    // Remove hook from settings
    const settingsPath = join(homedir(), '.claude', 'settings.json');
    try {
      const settings = JSON.parse(readFileSync(settingsPath, 'utf8'));
      if (settings.hooks?.PostToolUse) {
        settings.hooks.PostToolUse = settings.hooks.PostToolUse.filter(h =>
          !h.hooks?.some(hh => hh.command?.includes('claude-rpg'))
        );
        writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      }
    } catch {}

    // Remove command
    const cmdPath = join(homedir(), '.claude', 'commands', 'rpg.md');
    try { const { unlinkSync } = await import('fs'); unlinkSync(cmdPath); } catch {}

    console.log('\u{2705} claude-rpg uninstalled. State kept in ~/.claude-rpg/');
    break;
  }

  case 'help':
    process.stdout.write(showHelp());
    break;

  default:
    console.log(`Unknown command: ${command}`);
    process.stdout.write(showHelp());
}
