import { TaskDto } from "../dto/task.dto";
import * as fs from 'fs';

export class TaskRepository {
    constructor() { }

    public getAllTasks(): Array<TaskDto> | boolean {
        try {
            if (!this.checkIfFileExists()) {
                return false;
            } else {
                this.checkIfFileExists();
            }
        } catch (error: any) {
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

    private checkIfFileExists(): Array<TaskDto> | boolean {
        try {
            const data = JSON.parse(fs.readFileSync('/db/tasks.json', 'utf-8')) as Array<TaskDto>;
            console.log(data)
            if (data) {
                return data;
            } else {
                this.createFile(data);
                return false;
            }
        } catch {
            throw new Error();
        }
    }

    private createFile(data: Array<TaskDto>): void {
        try {
            fs.writeFile('/db/tasks.json', JSON.stringify(data), () => {
                console.log(data);
            });
        } catch {
            throw new Error();
        }
    }
}