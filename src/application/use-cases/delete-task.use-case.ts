import { TaskRepository } from "../repository/task.repository";

export class DeleteTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    public executeDeleteTask() {
        try {
            this.taskRepository.addTask();
        } catch {
            throw new Error();
        }
    }
}