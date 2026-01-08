import { TaskRepository } from "../repository/task.repository";

export class ListTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    public executeGetListTask() {
        try {
            this.taskRepository.addTask();
        } catch {
            throw new Error();
        }
    }
}