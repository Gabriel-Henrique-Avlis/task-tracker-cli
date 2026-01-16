import { TaskDto } from "../dto/task.dto";
import { StatusEnum } from "../enums/status.enum";
import { TaskRepository } from "../repository/task.repository";

export class UpdateTaskUseCase {
    private taskRepository: TaskRepository = new TaskRepository();

    constructor() { }

    public executeUpdateTask(id: number, task: string) {
        try {
            this.taskRepository.updateTask(id, task);
        } catch {
            throw new Error();
        }
    }

    public executeUpdateTaskStatus(id: number, status: StatusEnum) {
        try {
            this.taskRepository.updateTask(id, null, status);
        } catch {
            throw new Error();
        }
    }
}