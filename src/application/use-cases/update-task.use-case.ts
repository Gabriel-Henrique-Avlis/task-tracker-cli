import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class UpdateTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    public executeUpdateTask(task: TaskDto) {
        try {
            this.taskRepository.updateTask(task);
        } catch {
            throw new Error();
        }
    }
}