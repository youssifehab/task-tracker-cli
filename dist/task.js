"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Task {
    constructor(filePath = path.join(__dirname, "..", "tasks.json")) {
        this.filePath = filePath;
    }
    async add(description) {
        let tasksArr = [];
        if (fs.existsSync(this.filePath)) {
            const raw = await fs.promises.readFile(this.filePath, "utf8");
            tasksArr = raw ? JSON.parse(raw) : [];
        }
        const newId = tasksArr.length + 1;
        const task = {
            id: newId,
            description: description,
            status: "todo",
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        tasksArr.push(task);
        await fs.promises.writeFile(this.filePath, JSON.stringify(tasksArr, null, 2), "utf8");
        return "Task created successfully ✅";
    }
    async update(id, newDescription) {
        let tasksArr = [];
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
        await fs.promises.writeFile(this.filePath, JSON.stringify(tasksArr, null, 2), "utf8");
        return "Task updated successfully ✅";
    }
    async deleteById(id) {
        let tasksArr = [];
        if (fs.existsSync(this.filePath)) {
            const row = await fs.promises.readFile(this.filePath, "utf8");
            tasksArr = row ? JSON.parse(row) : [];
        }
        if (!tasksArr[id - 1]) {
            return "This task doesn't exist ❌";
        }
        delete tasksArr[id - 1];
        await fs.promises.writeFile(this.filePath, JSON.stringify(tasksArr, null, 2), "utf8");
        return "Task deleted successfully ✅";
    }
    async markInProgress(id) {
        let tasksArr = [];
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
        await fs.promises.writeFile(this.filePath, JSON.stringify(tasksArr, null, 2), "utf8");
        return "Status of the task updated successfully ✅";
    }
    async markDone(id) {
        let tasksArr = [];
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
        await fs.promises.writeFile(this.filePath, JSON.stringify(tasksArr, null, 2), "utf8");
        return "Status of the task updated successfully ✅";
    }
    async list() {
        let tasksArr = [];
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
    }
    async listByStatus(status) {
        let tasksArr = [];
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
    }
}
exports.Task = Task;
