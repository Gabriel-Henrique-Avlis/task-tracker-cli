import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class AddTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    public executeAddTask(task: TaskDto) {
        try {
            this.taskRepository.addTask(task);
        } catch {
            throw new Error();
        }
    }
}