import { TaskTrackerController } from "../../../presentation/controllers/task-tracker.controller";
import { StatusEnum } from "../../../application/enums/status.enum";

describe("TaskTrackerController", () => {
    let controller: TaskTrackerController;
    let listMock: any;
    let addMock: any;
    let updateMock: any;
    let deleteMock: any;

    beforeEach(() => {
        controller = new TaskTrackerController();

        listMock = {
            executeGetAllTasks: jest.fn().mockReturnValue([{ id: 1, title: "t1", status: StatusEnum.TODO }]),
            executeGetToDoTasks: jest.fn().mockReturnValue([{ id: 2, title: "t2", status: StatusEnum.TODO }]),
            executeGetInProgressTasks: jest.fn().mockReturnValue([{ id: 3, title: "t3", status: StatusEnum.IN_PROGRESS }]),
            executeGetDoneTasks: jest.fn().mockReturnValue([{ id: 4, title: "t4", status: StatusEnum.DONE }]),
        };

        addMock = { executeAddTask: jest.fn() };
        updateMock = { executeUpdateTask: jest.fn(), executeUpdateTaskStatus: jest.fn() };
        deleteMock = { executeDeleteTask: jest.fn() };

        (controller as any).listTasksUseCase = listMock;
        (controller as any).addTaskUseCase = addMock;
        (controller as any).updateTaskUseCase = updateMock;
        (controller as any).deleteTaskUseCase = deleteMock;
    });

    test("getAllTasks returns value from use case", () => {
        const result = controller.getAllTasks();
        expect(listMock.executeGetAllTasks).toHaveBeenCalled();
        expect(result).toEqual([{ id: 1, title: "t1", status: StatusEnum.TODO }]);
    });

    test("getToDoTasks returns value from use case", () => {
        const result = controller.getToDoTasks();
        expect(listMock.executeGetToDoTasks).toHaveBeenCalled();
        expect(result).toEqual([{ id: 2, title: "t2", status: StatusEnum.TODO }]);
    });

    test("getInProgressTasks returns value from use case", () => {
        const result = controller.getInProgressTasks();
        expect(listMock.executeGetInProgressTasks).toHaveBeenCalled();
        expect(result).toEqual([{ id: 3, title: "t3", status: StatusEnum.IN_PROGRESS }]);
    });

    test("getDoneTasks returns value from use case", () => {
        const result = controller.getDoneTasks();
        expect(listMock.executeGetDoneTasks).toHaveBeenCalled();
        expect(result).toEqual([{ id: 4, title: "t4", status: StatusEnum.DONE }]);
    });

    test("postTask calls add use case with provided task", () => {
        controller.postTask("new task");
        expect(addMock.executeAddTask).toHaveBeenCalledWith("new task");
    });

    test("putTask calls update use case with id and task", () => {
        controller.putTask(5, "updated");
        expect(updateMock.executeUpdateTask).toHaveBeenCalledWith(5, "updated");
    });

    test("putTaskStatusToDo calls updateTaskStatus with TODO", () => {
        controller.putTaskStatusToDo(6);
        expect(updateMock.executeUpdateTaskStatus).toHaveBeenCalledWith(6, StatusEnum.TODO);
    });

    test("putTaskStatusInProgress calls updateTaskStatus with IN_PROGRESS", () => {
        controller.putTaskStatusInProgress(7);
        expect(updateMock.executeUpdateTaskStatus).toHaveBeenCalledWith(7, StatusEnum.IN_PROGRESS);
    });

    test("putTaskStatusDone calls updateTaskStatus with DONE", () => {
        controller.putTaskStatusDone(8);
        expect(updateMock.executeUpdateTaskStatus).toHaveBeenCalledWith(8, StatusEnum.DONE);
    });

    test("deleteTask calls delete use case with id", () => {
        controller.deleteTask(9);
        expect(deleteMock.executeDeleteTask).toHaveBeenCalledWith(9);
    });

    test("getAllTasks rethrows on use case error", () => {
        listMock.executeGetAllTasks.mockImplementation(() => { throw new Error("boom"); });
        expect(() => controller.getAllTasks()).toThrow(Error);
    });

    test("postTask rethrows on use case error", () => {
        addMock.executeAddTask.mockImplementation(() => { throw new Error("add-fail"); });
        expect(() => controller.postTask("x")).toThrow(Error);
    });

    test("putTaskStatusInProgress rethrows on use case error", () => {
        updateMock.executeUpdateTaskStatus.mockImplementation(() => { throw new Error("update-fail"); });
        expect(() => controller.putTaskStatusInProgress(1)).toThrow(Error);
    });

    test("getToDoTasks rethrows on use case error", () => {
        listMock.executeGetToDoTasks.mockImplementation(() => { throw new Error("todo-fail"); });
        expect(() => controller.getToDoTasks()).toThrow(Error);
    });

    test("getInProgressTasks rethrows on use case error", () => {
        listMock.executeGetInProgressTasks.mockImplementation(() => { throw new Error("inprogress-fail"); });
        expect(() => controller.getInProgressTasks()).toThrow(Error);
    });

    test("getDoneTasks rethrows on use case error", () => {
        listMock.executeGetDoneTasks.mockImplementation(() => { throw new Error("done-fail"); });
        expect(() => controller.getDoneTasks()).toThrow(Error);
    });

    test("putTask rethrows on use case error", () => {
        updateMock.executeUpdateTask.mockImplementation(() => { throw new Error("update-task-fail"); });
        expect(() => controller.putTask(1, "task")).toThrow(Error);
    });

    test("putTaskStatusToDo rethrows on use case error", () => {
        updateMock.executeUpdateTaskStatus.mockImplementation(() => { throw new Error("status-todo-fail"); });
        expect(() => controller.putTaskStatusToDo(1)).toThrow(Error);
    });

    test("putTaskStatusDone rethrows on use case error", () => {
        updateMock.executeUpdateTaskStatus.mockImplementation(() => { throw new Error("status-done-fail"); });
        expect(() => controller.putTaskStatusDone(1)).toThrow(Error);
    });

    test("deleteTask rethrows on use case error", () => {
        deleteMock.executeDeleteTask.mockImplementation(() => { throw new Error("delete-fail"); });
        expect(() => controller.deleteTask(1)).toThrow(Error);
    });
});