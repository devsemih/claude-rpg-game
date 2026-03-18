---
name: rpg
description: View your RPG character status, inventory, quests, and equipment
argument-hint: [status | inventory | equip <name> | unequip <slot> | quests | daily | history | help]
---

Run the appropriate `claude-rpg` command based on the user's input and show the exact output:

- No args or "status": `claude-rpg status`
- "inventory" or "inv": `claude-rpg inventory`
- "equip <item name>": `claude-rpg equip "<item name>"`
- "unequip <slot>": `claude-rpg unequip "<slot>"`
- "quests": `claude-rpg quests`
- "daily": `claude-rpg daily`
- "history": `claude-rpg history`
- "help": `claude-rpg help`

User input: $ARGUMENTS

Run the command using Bash and display the output exactly as returned. Do not add commentary.
