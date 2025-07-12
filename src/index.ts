#!/usr/bin/env node

import { Task } from "./task";

async function run() {
  const [, , command, ...args] = process.argv;
  const task = new Task();

  switch (command) {
    case "add":
      if (args.length < 1) {
        console.log('Usage: task-cli add "task description"');
        break;
      }
      console.log(await task.add(args.join(" ")));
      break;

    case "update":
      if (args.length < 2) {
        console.log('Usage: task-cli update <id> "new description"');
        break;
      }
      console.log(await task.update(parseInt(args[0]), args[1]));
      break;

    case "delete":
      if (args.length !== 1) {
        console.log("Usage: task-cli delete <id>");
        break;
      }
      console.log(await task.deleteById(parseInt(args[0])));
      break;

    case "mark-in-progress":
      if (args.length !== 1) {
        console.log("Usage: task-cli mark-in-progress <id>");
        break;
      }
      console.log(await task.markInProgress(parseInt(args[0])));
      break;

    case "mark-done":
      if (args.length !== 1) {
        console.log("Usage: task-cli mark-done <id>");
        break;
      }
      console.log(await task.markDone(parseInt(args[0])));
      break;

    case "list":
      if (args.length === 0) {
        console.log(await task.list());
        break;
      } else if (
        (args.length === 1 && args[0] === "todo") ||
        args[0] === "in-progress" ||
        args[0] === "done"
      ) {
        console.log(await task.listByStatus(args[0]));
        break;
      } else {
        console.log("Usage: task-cli list <status> or task-cli list");
        break;
      }

    default:
      console.log("Unknown command.");
      console.log(
        `Available commands: add, update, delete, mark-in-progress, mark-done, list`
      );
  }
}

run();
