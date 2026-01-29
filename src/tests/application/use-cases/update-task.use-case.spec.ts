import { UpdateTaskUseCase } from '../../../application/use-cases/update-task.use-case';
import { TaskRepository } from '../../../application/repository/task.repository';
import { StatusEnum } from '../../../application/enums/status.enum';

describe('UpdateTaskUseCase', () => {
    let useCase: UpdateTaskUseCase;

    beforeEach(() => {
        useCase = new UpdateTaskUseCase();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('calls repository.updateTask with id and task', () => {
        const spy = jest
            .spyOn(TaskRepository.prototype, 'updateTask')
            .mockImplementation(() => { });
        useCase.executeUpdateTask(1, 'updated task');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(1, 'updated task');
    });

    it('calls repository.updateTask with id, null and status', () => {
        const spy = jest
            .spyOn(TaskRepository.prototype, 'updateTask')
            .mockImplementation(() => { });
        useCase.executeUpdateTaskStatus(2, StatusEnum.DONE);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(2, null, StatusEnum.DONE);
    });

    it('throws when repository.updateTask throws in executeUpdateTask', () => {
        jest
            .spyOn(TaskRepository.prototype, 'updateTask')
            .mockImplementation(() => {
                throw new Error('repo error');
            });
        expect(() => useCase.executeUpdateTask(3, 'x')).toThrow(Error);
    });

    it('throws when repository.updateTask throws in executeUpdateTaskStatus', () => {
        jest
            .spyOn(TaskRepository.prototype, 'updateTask')
            .mockImplementation(() => {
                throw new Error('repo error');
            });
        expect(() => useCase.executeUpdateTaskStatus(4, StatusEnum.TODO)).toThrow(Error);
    });
});