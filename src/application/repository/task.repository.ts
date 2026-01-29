import path = require("path");
import { TaskDto } from "../dto/task.dto";
import * as fs from 'fs';
import { StatusEnum } from "../enums/status.enum";

export class TaskRepository {
    constructor() { }

    public getAllTasks(): Array<TaskDto> {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            return tasks;
        } catch (error: any) {
            console.log(error)
            throw new Error();
        }
    }

    public getAllToDoTasks(): Array<TaskDto> {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            let tasksToDo: Array<TaskDto> = [];
            tasksToDo = tasks.filter(t => t.getStatus() == StatusEnum.TODO)
            return tasksToDo;
        } catch (error: any) {
            throw new Error();
        }
    }

    public getAllInProgressTasks(): Array<TaskDto> {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            let tasksInProgress: Array<TaskDto> = [];
            tasksInProgress = tasks.filter(t => t.getStatus() == StatusEnum.IN_PROGRESS)
            return tasksInProgress;
        } catch (error: any) {
            throw new Error();
        }
    }

    public getAllDoneTasks(): Array<TaskDto> {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            let tasksDone: Array<TaskDto> = [];
            tasksDone = tasks.filter(t => t.getStatus() == StatusEnum.DONE)
            return tasksDone;
        } catch (error: any) {
            throw new Error();
        }
    }

    public addTask(task: TaskDto): void {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            task.setId(tasks.length + 1);
            tasks.push(task);
            this.modifyFile(tasks);
        } catch (error: any) {
            throw new Error();
        }
    }

    public deleteTask(id: number): void {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            tasks = tasks.filter(t => t.getId() != id);
            this.modifyFile(tasks);
        } catch (error: any) {
            throw new Error();
        }
    }

    public updateTask(id: number, task?: string, status?: StatusEnum): void {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            let taskIndex = tasks.findIndex(t => t.getId() == id);
            if (task) {
                tasks[taskIndex].setDescription(task);
            }
            tasks[taskIndex].setUpdatedAt(new Date().toISOString());
            if (status) {
                tasks[taskIndex].setStatus(status);
            }
            this.modifyFile(tasks);
        } catch (error: any) {
            console.log(error);
            throw new Error();
        }
    }

    private checkIfFileExists(): Array<TaskDto> {
        try {
            const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../db/tasks.json'), 'utf-8')) as any;
            const arr = Array.isArray(raw?.data) ? raw.data : [];
            const tasks: Array<TaskDto> = arr.map((o: any) => {
                const t = new TaskDto();
                if (o.id !== undefined) t.setId(o.id);
                if (o.description !== undefined) t.setDescription(o.description);
                if (o.status !== undefined) t.setStatus(o.status as StatusEnum);
                if (o.updatedAt !== undefined) t.setUpdatedAt(o.updatedAt);
                return t;
            });
            return tasks;
        } catch (err) {
            this.createFile();
            console.log('file created');
            return [];
        }
    }

    private createFile(): void {
        try {
            fs.writeFileSync(path.join(__dirname, '../../../db/tasks.json'), '{"data":[]}');
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    private modifyFile(data: Array<TaskDto>): void {
        try {
            fs.writeFileSync(path.join(__dirname, '../../../db/tasks.json'), JSON.stringify({ data: data }));
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }
}