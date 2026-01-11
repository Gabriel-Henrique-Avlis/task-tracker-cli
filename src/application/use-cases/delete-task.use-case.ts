import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class DeleteTaskUseCase {
    private taskRepository: TaskRepository = new TaskRepository();

    constructor() { }

    public executeDeleteTask(id: string) {
        try {
            this.taskRepository.deleteTask(id);
        } catch {
            throw new Error();
        }
    }
}