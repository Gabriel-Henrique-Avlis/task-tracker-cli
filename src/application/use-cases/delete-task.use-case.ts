import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class DeleteTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    public executeDeleteTask(task: TaskDto) {
        try {
            this.taskRepository.deleteTask(task.getId());
        } catch {
            throw new Error();
        }
    }
}