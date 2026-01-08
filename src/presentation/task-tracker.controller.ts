import { TaskDto } from "../application/dto/task.dto";
import { ListTaskUseCase } from "../application/use-cases/list-tasks.use-case";

export class TaskTrackerController {
    private listTasksUseCase: ListTaskUseCase = new ListTaskUseCase();

    constructor() { }

    public getAllTasks(): Array<TaskDto> {
        try {
            return this.listTasksUseCase.executeGetAllTasks();
        } catch (err) {
            console.log(err)
            throw new Error();
        }
    }
}