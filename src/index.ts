import { Task } from "./task";

async function run() {
  const task = new Task();
  console.log(await task.deleteById(6));
  console.log(await task.markDone(6));
  console.log(await task.markInProgress(5));
  console.log(await task.list());
  console.log(await task.listByStatus("done"));
  console.log(await task.listByStatus("in-progress"));
  console.log(await task.listByStatus("todo"));
  console.log(await task.add("hello"));
  console.log(await task.update(2, "hello"));
}

run();
