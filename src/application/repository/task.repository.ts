import path = require("path");
import { TaskDto } from "../dto/task.dto";
import * as fs from 'fs';
import { StatusEnum } from "../enums/status.enum";

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

    public addTask(task: TaskDto): void {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            tasks.push(task);
            this.modifyFile(tasks);
        } catch (error: any) {
            throw new Error();
        }
    }

    public deleteTask(id: string): void {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            tasks = tasks.filter(t => t.getId() !== id);
            this.modifyFile(tasks);
        } catch (error: any) {
            throw new Error();
        }
    }

    public updateTask(task: TaskDto): void {
        try {
            let tasks: Array<TaskDto> = this.checkIfFileExists();
            let taskIndex = tasks.findIndex(t => t.getId() == task.getId());
            tasks[taskIndex] = task;
            this.modifyFile(tasks);
        } catch (error: any) {
            throw new Error();
        }
    }

    private checkIfFileExists(): Array<TaskDto> {
        try {
            const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../db/tasks.json'), 'utf-8')) as Array<TaskDto>;
            console.log(data)
            return data;
        } catch (err) {
            this.createFile();
            console.log(err);
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
            fs.writeFileSync(path.join(__dirname, '../../../db/tasks.json'), JSON.stringify(data));
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }
}