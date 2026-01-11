import { TaskDto } from "../dto/task.dto";
import { StatusEnum } from "../enums/status.enum";
import { TaskRepository } from "../repository/task.repository";

export class UpdateTaskUseCase {
    private taskRepository: TaskRepository = new TaskRepository();

    constructor() { }

    public executeUpdateTask(task: string, id: number) {
        try {
            this.taskRepository.updateTask(task, id);
        } catch {
            throw new Error();
        }
    }

    public executeUpdateTaskStatus(id: number, status: StatusEnum) {
        try {
            this.taskRepository.updateTask("", id, status);
        } catch {
            throw new Error();
        }
    }
}