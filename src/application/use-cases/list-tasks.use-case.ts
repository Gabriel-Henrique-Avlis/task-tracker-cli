import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class ListTaskUseCase {
    private taskRepository: TaskRepository = new TaskRepository();

    constructor() { }

    public executeGetAllTasks(): Array<TaskDto> {
        try {
            return this.taskRepository.getAllTasks();
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    public executeGetToDoTasks(): Array<TaskDto> {
        try {
            return this.taskRepository.getAllToDoTasks();
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    public executeGetInProgressTasks(): Array<TaskDto> {
        try {
            return this.taskRepository.getAllInProgressTasks();
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }

    public executeGetDoneTasks(): Array<TaskDto> {
        try {
            return this.taskRepository.getAllDoneTasks();
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }
}