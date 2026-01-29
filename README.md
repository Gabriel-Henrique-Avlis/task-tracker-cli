# task-tracker-cli

A small command-line task tracker that stores tasks in a local JSON file. This project was created as a roadmap.sh challenge and provides simple CRUD operations and status management from the terminal.

## Features

- Add, update and delete tasks
- List all tasks or filter by status (`todo`, `in-progress`, `done`)
- Change task status to `todo`, `in-progress`, or `done`
- Stores data in `db/tasks.json` (simple JSON file)

## Installation

1. Install Node.js (tested with Node 24+)
2. Install dependencies and build:

```bash
npm install
npm run build
```

## Usage

- Run the CLI with `node dist/index.js <command> [args]` or use `npm start` after building.

Commands:

- `add <description>` — Add a new task with the given description.
- `update <id> <description>` — Update the description of a task by id.
- `delete <id>` — Remove a task by id.
- `list [todo|in-progress|done]` — List all tasks or filter by a status.
- `mark-done <id>` — Mark a task as done.
- `mark-in-progress <id>` — Mark a task as in progress.
- `mark-todo <id>` — Mark a task as to-do.

Examples:

```bash
# List all tasks
node dist/index.js list

# Add a task
node dist/index.js add "Buy groceries"

# Mark task 1 as done
node dist/index.js mark-done 1
```

## Data file

The app stores tasks in `db/tasks.json` as an object with a `data` array. The repository creates this file automatically if it does not exist.

## Development

- TypeScript source lives in `src/` and compiles to `dist/`.
- Run `npm run build` to compile.

## License

MIT

https://roadmap.sh/projects/task-tracker

