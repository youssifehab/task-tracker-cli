# 🧩 Task Tracker CLI

Project URL: https://github.com/youssifehab/task-tracker-cli

A simple command-line tool to manage your tasks. Supports adding, updating, deleting, marking status, and listing tasks — all from the terminal.

---

## 🚀 Features

- ✅ Add new tasks
- 📝 Update existing tasks
- ❌ Delete tasks by ID
- ❌ Delete all tasks
- 🔄 Mark tasks as `todo`, `in-progress` or `done`
- 📋 List all tasks or filter by status (`todo`, `in-progress`, `done`)
- 🗃️ Data stored in a local JSON file (`tasks.json`)

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/youssifehab/task-tracker-cli.git

cd task-tracker-cli

# Install dependencies
npm install

# Compile TypeScript to JavaScript
npm run build

# Link globally (to use `task-cli` from anywhere)
npm link
```

---

## 🧪 Usage

```bash
# Add a new task
task-cli add "Buy groceries"

# Update a task
task-cli update 1 "Buy groceries and cook dinner"

# Delete a task
task-cli delete 1

# Delete all tasks
task-cli delete-all

# Mark a task as in-progress
task-cli mark-in-progress 2

# Mark a task as done
task-cli mark-done 2

# Mark a task as todo
task-cli mark-todo 2

# List all tasks
task-cli list

# List tasks by status
task-cli list todo
task-cli list in-progress
task-cli list done
```
