import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class UpdateTaskUseCase {
    private taskRepository: TaskRepository = new TaskRepository();

    constructor() { }

    public executeUpdateTask(task: TaskDto) {
        try {
            this.taskRepository.updateTask(task);
        } catch {
            throw new Error();
        }
    }
}