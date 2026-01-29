import * as fs from 'fs';
import { TaskRepository } from '../../../application/repository/task.repository';
import { TaskDto } from '../../../application/dto/task.dto';
import { StatusEnum } from '../../../application/enums/status.enum';

describe('TaskRepository', () => {
    let repo: TaskRepository;

    beforeEach(() => {
        jest.restoreAllMocks();
        repo = new TaskRepository();
    });

    test('getAllTasks returns mapped TaskDto array', () => {
        const raw = { data: [{ id: 1, description: 'a', status: StatusEnum.TODO }] };
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(raw));
        const tasks = repo.getAllTasks();
        expect(tasks.length).toBe(1);
        expect(tasks[0].getId()).toBe(1);
        expect(tasks[0].getStatus()).toBe(StatusEnum.TODO);
    });

    test('getAllToDoTasks filters TODO tasks', () => {
        const raw = {
            data: [
                { id: 1, description: 't1', status: StatusEnum.TODO },
                { id: 2, description: 't2', status: StatusEnum.IN_PROGRESS },
                { id: 3, description: 't3', status: StatusEnum.TODO }
            ]
        };
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(raw));
        const todos = repo.getAllToDoTasks();
        expect(todos.length).toBe(2);
        expect(todos.every(t => t.getStatus() === StatusEnum.TODO)).toBe(true);
    });

    test('addTask assigns id and writes file', () => {
        const raw: { data: any[] } = { data: [] };
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(raw));
        const writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined);
        const t = new TaskDto();
        t.setDescription('new task');
        t.setStatus(StatusEnum.TODO);
        repo.addTask(t);
        expect(writeSpy).toHaveBeenCalled();
        const written = JSON.parse((writeSpy.mock.calls[0][1]) as string);
        expect(Array.isArray(written.data)).toBe(true);
        expect(written.data.length).toBe(1);
        expect(written.data[0].id).toBe(1);
        expect(written.data[0].description).toBe('new task');
        expect(written.data[0].status).toBe(StatusEnum.TODO);
    });

    test('deleteTask removes task and writes file', () => {
        const raw = { data: [{ id: 1, description: 'a' }, { id: 2, description: 'b' }] };
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(raw));
        const writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined);
        repo.deleteTask(1);
        expect(writeSpy).toHaveBeenCalled();
        const written = JSON.parse((writeSpy.mock.calls[0][1]) as string);
        expect(written.data.length).toBe(1);
        expect(written.data[0].id).toBe(2);
    });

    test('updateTask updates description, status and updatedAt', () => {
        const raw = {
            data: [
                { id: 1, description: 'a', status: StatusEnum.TODO },
                { id: 2, description: 'b', status: StatusEnum.IN_PROGRESS }
            ]
        };
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => JSON.stringify(raw));
        const writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined);
        repo.updateTask(2, 'updated', StatusEnum.DONE);
        expect(writeSpy).toHaveBeenCalled();
        const written = JSON.parse((writeSpy.mock.calls[0][1]) as string);
        const updated = written.data.find((d: any) => d.id === 2);
        expect(updated.description).toBe('updated');
        expect(updated.status).toBe(StatusEnum.DONE);
        expect(updated.updatedAt).toBeDefined();
    });

    test('creates file when readFileSync throws', () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => { throw new Error('no file'); });
        const writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined);
        const tasks = repo.getAllTasks();
        expect(tasks).toEqual([]);
        expect(writeSpy).toHaveBeenCalled();
        // verify created content contains empty data array
        const createdContent = writeSpy.mock.calls[0][1] as string;
        expect(createdContent).toContain('"data":[]');
    });
});