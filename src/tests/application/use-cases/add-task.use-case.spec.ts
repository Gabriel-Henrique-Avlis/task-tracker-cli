import { AddTaskUseCase } from '../../../application/use-cases/add-task.use-case';
import { TaskRepository } from '../../../application/repository/task.repository';
import { TaskDto } from '../../../application/dto/task.dto';

describe('AddTaskUseCase', () => {
    afterEach(() => jest.restoreAllMocks());

    it('calls TaskRepository.addTask with a TaskDto containing the provided description', () => {
        const addSpy = jest.spyOn(TaskRepository.prototype, 'addTask').mockImplementation(() => { });
        const useCase = new AddTaskUseCase();
        const description = 'Write unit tests';

        useCase.executeAddTask(description);

        expect(addSpy).toHaveBeenCalledTimes(1);
        const passedArg = addSpy.mock.calls[0][0] as unknown;
        expect(passedArg).toBeInstanceOf(TaskDto);
        const actualDescription =
            typeof (passedArg as any).getDescription === 'function'
                ? (passedArg as any).getDescription()
                : (passedArg as any).description;
        expect(actualDescription).toBe(description);
    });

    it('throws an Error when TaskRepository.addTask throws', () => {
        jest.spyOn(TaskRepository.prototype, 'addTask').mockImplementation(() => {
            throw new Error('repository failure');
        });
        const useCase = new AddTaskUseCase();
        expect(() => useCase.executeAddTask('fails')).toThrow(Error);
    });
});