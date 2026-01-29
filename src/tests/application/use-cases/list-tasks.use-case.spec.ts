import { ListTaskUseCase } from "../../../application/use-cases/list-tasks.use-case";
import { TaskRepository } from "../../../application/repository/task.repository";
import { TaskDto } from "../../../application/dto/task.dto";

describe("ListTaskUseCase", () => {
    let useCase: ListTaskUseCase;

    beforeEach(() => {
        useCase = new ListTaskUseCase();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const sampleTasks: TaskDto[] = [{ id: "1", title: "T1" } as any];

    test("executeGetAllTasks returns repository results", () => {
        jest
            .spyOn(TaskRepository.prototype, "getAllTasks")
            .mockReturnValue(sampleTasks);

        const result = useCase.executeGetAllTasks();
        expect(result).toBe(sampleTasks);
    });

    test("executeGetAllTasks rethrows when repository throws and logs error", () => {
        const repoErr = new Error("repo");
        jest
            .spyOn(TaskRepository.prototype, "getAllTasks")
            .mockImplementation(() => {
                throw repoErr;
            });
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        expect(() => useCase.executeGetAllTasks()).toThrow(Error);
        expect(logSpy).toHaveBeenCalledWith(repoErr);
    });

    test("executeGetToDoTasks returns repository results", () => {
        jest
            .spyOn(TaskRepository.prototype, "getAllToDoTasks")
            .mockReturnValue(sampleTasks);

        const result = useCase.executeGetToDoTasks();
        expect(result).toBe(sampleTasks);
    });

    test("executeGetToDoTasks rethrows when repository throws and logs error", () => {
        const repoErr = new Error("repo");
        jest
            .spyOn(TaskRepository.prototype, "getAllToDoTasks")
            .mockImplementation(() => {
                throw repoErr;
            });
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        expect(() => useCase.executeGetToDoTasks()).toThrow(Error);
        expect(logSpy).toHaveBeenCalledWith(repoErr);
    });

    test("executeGetInProgressTasks returns repository results", () => {
        jest
            .spyOn(TaskRepository.prototype, "getAllInProgressTasks")
            .mockReturnValue(sampleTasks);

        const result = useCase.executeGetInProgressTasks();
        expect(result).toBe(sampleTasks);
    });

    test("executeGetInProgressTasks rethrows when repository throws and logs error", () => {
        const repoErr = new Error("repo");
        jest
            .spyOn(TaskRepository.prototype, "getAllInProgressTasks")
            .mockImplementation(() => {
                throw repoErr;
            });
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        expect(() => useCase.executeGetInProgressTasks()).toThrow(Error);
        expect(logSpy).toHaveBeenCalledWith(repoErr);
    });

    test("executeGetDoneTasks returns repository results", () => {
        jest
            .spyOn(TaskRepository.prototype, "getAllDoneTasks")
            .mockReturnValue(sampleTasks);

        const result = useCase.executeGetDoneTasks();
        expect(result).toBe(sampleTasks);
    });

    test("executeGetDoneTasks rethrows when repository throws and logs error", () => {
        const repoErr = new Error("repo");
        jest
            .spyOn(TaskRepository.prototype, "getAllDoneTasks")
            .mockImplementation(() => {
                throw repoErr;
            });
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        expect(() => useCase.executeGetDoneTasks()).toThrow(Error);
        expect(logSpy).toHaveBeenCalledWith(repoErr);
    });
});