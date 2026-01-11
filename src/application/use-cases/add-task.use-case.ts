import { TaskDto } from "../dto/task.dto";
import { TaskRepository } from "../repository/task.repository";

export class AddTaskUseCase {
    private taskRepository: TaskRepository = new TaskRepository();

    constructor() { }

    public executeAddTask(task: string) {
        try {
            let newTask: TaskDto = new TaskDto();
            newTask.setDescription(task);
            this.taskRepository.addTask(newTask);
        } catch {
            throw new Error();
        }
    }
}