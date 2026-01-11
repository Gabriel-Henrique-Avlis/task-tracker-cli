import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class AddTaskUseCase {
    private taskRepository: TaskRepository = new TaskRepository();

    constructor() { }

    public executeAddTask(task: TaskDto) {
        try {
            this.taskRepository.addTask(task);
        } catch {
            throw new Error();
        }
    }
}