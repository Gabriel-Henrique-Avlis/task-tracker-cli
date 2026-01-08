import { TaskRepository } from "../repository/task.repository";

export class AddTaskUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    public executeAddTask() {
        try {
            this.taskRepository.addTask();
        } catch {
            throw new Error();
        }
    }
}