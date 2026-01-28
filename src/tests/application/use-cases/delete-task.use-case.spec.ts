import { DeleteTaskUseCase } from "../../../application/use-cases/delete-task.use-case";
import { TaskRepository } from "../../../application/repository/task.repository";

describe("DeleteTaskUseCase", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("calls repository.deleteTask with provided id", () => {
        const spy = jest
            .spyOn(TaskRepository.prototype, "deleteTask")
            .mockImplementation(() => { });
        const useCase = new DeleteTaskUseCase();

        useCase.executeDeleteTask(42);

        expect(spy).toHaveBeenCalledWith(42);
    });

    test("throws Error when repository.deleteTask throws", () => {
        jest
            .spyOn(TaskRepository.prototype, "deleteTask")
            .mockImplementation(() => {
                throw new Error("repo failure");
            });
        const useCase = new DeleteTaskUseCase();

        expect(() => useCase.executeDeleteTask(1)).toThrow(Error);
    });
});