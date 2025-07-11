import * as fs from "fs";
import * as path from "path";

type taskStatus = "todo" | "in-progress" | "done";

interface taskData {
  id: number;
  description: string;
  status: taskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  public async add(description: string) {
    const filePath = path.join(__dirname, "..", "tasks.json");

    let tasksArr: taskData[] = [];
    if (fs.existsSync(filePath)) {
      const raw = await fs.promises.readFile(filePath, "utf8");
      tasksArr = raw ? JSON.parse(raw) : [];
    }

    const newId: number = tasksArr.length + 1;

    const task: taskData = {
      id: newId,
      description: description,
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasksArr.push(task);

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(tasksArr, null, 2),
      "utf8"
    );

    console.log("Task create successfully ✅");
  }
}
