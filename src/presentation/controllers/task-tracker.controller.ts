import { TaskDto } from "../../application/dto/task.dto";
import { AddTaskUseCase } from "../../application/use-cases/add-task.use-case";
import { DeleteTaskUseCase } from "../../application/use-cases/delete-task.use-case";
import { ListTaskUseCase } from "../../application/use-cases/list-tasks.use-case";
import { UpdateTaskUseCase } from "../../application/use-cases/update-task.use-case";

export class TaskTrackerController {
    private listTasksUseCase: ListTaskUseCase = new ListTaskUseCase();
    private addTaskUseCase: AddTaskUseCase = new AddTaskUseCase();
    private updateTaskUseCase: UpdateTaskUseCase = new UpdateTaskUseCase();
    private deleteTaskUseCase: DeleteTaskUseCase = new DeleteTaskUseCase();

    constructor() { }

    public getAllTasks(): Array<TaskDto> {
        try {
            return this.listTasksUseCase.executeGetAllTasks();
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    public getToDoTasks(): Array<TaskDto> {
        try {
            return this.listTasksUseCase.executeGetToDoTasks();
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    public getInProgressTasks(): Array<TaskDto> {
        try {
            return this.listTasksUseCase.executeGetInProgressTasks();
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    public getDoneTasks(): Array<TaskDto> {
        try {
            return this.listTasksUseCase.executeGetDoneTasks();
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    public postTask(task: string): void {
        try {
            return this.addTaskUseCase.executeAddTask(task);
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    public putTask(task: string, id: number): void {
        try {
            return this.updateTaskUseCase.executeUpdateTask(task, id);
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    public deleteTask(id: number): void {
        try {
            return this.deleteTaskUseCase.executeDeleteTask(id);
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }
}