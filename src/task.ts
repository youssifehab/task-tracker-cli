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
  constructor(
    private filePath: string = path.join(__dirname, "..", "tasks.json")
  ) {}
  public async add(description: string) {
    try {
      let tasksArr: taskData[] = [];
      if (fs.existsSync(this.filePath)) {
        const raw = await fs.promises.readFile(this.filePath, "utf8");
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
        this.filePath,
        JSON.stringify(tasksArr, null, 2),
        "utf8"
      );

      return "Task created successfully ✅";
    } catch (err) {
      console.log("add task error: ", err);
    }
  }

  public async update(id: number, newDescription: string) {
    try {
      let tasksArr: taskData[] = [];

      if (fs.existsSync(this.filePath)) {
        const raw = await fs.promises.readFile(this.filePath, "utf8");
        tasksArr = raw ? JSON.parse(raw) : [];
      }

      if (!tasksArr[id - 1]) {
        return "This task doesn't exist ❌";
      }

      let task = tasksArr[id - 1];
      task.description = newDescription;
      task.updatedAt = new Date();

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(tasksArr, null, 2),
        "utf8"
      );

      return "Task updated successfully ✅";
    } catch (err) {
      console.log("update task error: ", err);
    }
  }

  public async deleteById(id: number) {
    try {
      let tasksArr: taskData[] = [];

      if (fs.existsSync(this.filePath)) {
        const row = await fs.promises.readFile(this.filePath, "utf8");
        tasksArr = row ? JSON.parse(row) : [];
      }

      if (!tasksArr[id - 1]) {
        return "This task doesn't exist ❌";
      }

      delete tasksArr[id - 1];

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(tasksArr, null, 2),
        "utf8"
      );

      return "Task deleted successfully ✅";
    } catch (err) {
      console.log("delete task error: ", err);
    }
  }

  public async markInProgress(id: number) {
    try {
      let tasksArr: taskData[] = [];

      if (fs.existsSync(this.filePath)) {
        const row = await fs.promises.readFile(this.filePath, "utf8");
        tasksArr = row ? JSON.parse(row) : [];
      }

      if (!tasksArr[id - 1]) {
        return "This task doesn't exist ❌";
      }

      let task = tasksArr[id - 1];
      task.status = "in-progress";
      task.updatedAt = new Date();

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(tasksArr, null, 2),
        "utf8"
      );

      return "Status of the task updated successfully ✅";
    } catch (err) {
      console.log("update status to in progress error: ", err);
    }
  }

  public async markDone(id: number) {
    try {
      let tasksArr: taskData[] = [];

      if (fs.existsSync(this.filePath)) {
        const row = await fs.promises.readFile(this.filePath, "utf8");
        tasksArr = row ? JSON.parse(row) : [];
      }

      if (!tasksArr[id - 1]) {
        return "This task doesn't exist ❌";
      }

      let task = tasksArr[id - 1];
      task.status = "done";
      task.updatedAt = new Date();

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(tasksArr, null, 2),
        "utf8"
      );

      return "Status of the task updated successfully ✅";
    } catch (err) {
      console.log("update status to done error: ", err);
    }
  }

  public async markTodo(id: number) {
    try {
      let tasksArr: taskData[] = [];

      if (fs.existsSync(this.filePath)) {
        const row = await fs.promises.readFile(this.filePath, "utf8");
        tasksArr = row ? JSON.parse(row) : [];
      }

      if (!tasksArr[id - 1]) {
        return "This task doesn't exist ❌";
      }

      let task = tasksArr[id - 1];
      task.status = "todo";
      task.updatedAt = new Date();

      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(tasksArr, null, 2),
        "utf8"
      );

      return "Status of the task updated successfully ✅";
    } catch (err) {
      console.log("update status to todo error: ", err);
    }
  }

  public async list() {
    try {
      let tasksArr: taskData[] = [];

      if (fs.existsSync(this.filePath)) {
        const row = await fs.promises.readFile(this.filePath, "utf8");
        tasksArr = row ? JSON.parse(row) : [];
      }

      let result = [];
      for (let task of tasksArr) {
        if (task) {
          result.push({
            id: task.id,
            description: task.description,
            status: task.status,
          });
        }
      }
      return result;
    } catch (err) {
      console.log("list tasks error: ", err);
    }
  }

  public async listByStatus(status: taskStatus) {
    try {
      let tasksArr: taskData[] = [];

      if (fs.existsSync(this.filePath)) {
        const row = await fs.promises.readFile(this.filePath, "utf8");
        tasksArr = row ? JSON.parse(row) : [];
      }

      let result = [];
      for (let task of tasksArr) {
        if (task && status === task.status) {
          result.push({
            id: task.id,
            description: task.description,
            status: task.status,
          });
        }
      }
      return result;
    } catch (err) {
      console.log("list tasks by status error: ", err);
    }
  }
}
