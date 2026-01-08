import { TaskRepository } from "../repository/task.repository";

export class UpdateTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    public executeUpdateTask() {
        try {
            this.taskRepository.addTask();
        } catch {
            throw new Error();
        }
    }
}