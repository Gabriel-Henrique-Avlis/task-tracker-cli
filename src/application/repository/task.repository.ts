import path = require("path");
import { TaskDto } from "../dto/task.dto";
import * as fs from 'fs';

export class TaskRepository {
    constructor() { }

    public getAllTasks(): Array<TaskDto> {
        try {
            return this.checkIfFileExists();
        } catch (error: any) {
            console.log(error)
            throw new Error();
        }
    }

    public getAllToDoTasks(): Array<TaskDto> {
        try {
            this.checkIfFileExists();
            return;
        } catch (error: any) {
            throw new Error();
        }
    }

    public getAllNotDoneTasks(): Array<TaskDto> {
        try {
            this.checkIfFileExists();
            return;
        } catch (error: any) {
            throw new Error();
        }
    }

    public getAllInProgressTasks(): Array<TaskDto> {
        try {
            this.checkIfFileExists();
            return;
        } catch (error: any) {
            throw new Error();
        }
    }

    public addTask(): void {
        try {
            this.checkIfFileExists();
        } catch (error: any) {
            throw new Error();
        }
    }

    public deleteTask(): void {
        try {
            this.checkIfFileExists();
        } catch (error: any) {
            throw new Error();
        }
    }

    public updateTask(): void {
        try {
            this.checkIfFileExists();
        } catch (error: any) {
            throw new Error();
        }
    }

    private checkIfFileExists(): Array<TaskDto> {
        try {
            const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../db/tasks.json'), 'utf-8')) as Array<TaskDto>;
            console.log(data)
            if (data) {
                return data;
            } else {
                this.createFile(data);
                return [];
            }
        } catch (err) {
            this.createFile();
            console.log(err);
        }
    }

    private createFile(data?: Array<TaskDto>): void {
        try {
            fs.writeFileSync(path.join(__dirname, '../../../db/tasks.json'), "{}");
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    private modifyFile(data?: Array<TaskDto>): void {
        try {
            fs.writeFileSync(path.join(__dirname, '../../../db/tasks.json'), "{}");
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }
}