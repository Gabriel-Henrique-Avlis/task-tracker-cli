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
}