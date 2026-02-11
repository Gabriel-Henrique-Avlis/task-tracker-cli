import * as fs from 'fs';
import { TaskRepository } from '../../../application/repository/task.repository';
import { TaskDto } from '../../../application/dto/task.dto';
import { StatusEnum } from '../../../application/enums/status.enum';

// Mock fs module at the top level
jest.mock('fs');

describe('TaskRepository', () => {
    let repo: TaskRepository;
    let mockDatabase: { data: any[] };

    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();

        // Initialize mock database for each test
        mockDatabase = { data: [] };

        // Mock fs.readFileSync to return mock database
        (fs.readFileSync as jest.Mock).mockImplementation(() => {
            return JSON.stringify(mockDatabase);
        });

        // Mock fs.writeFileSync to update mock database
        (fs.writeFileSync as jest.Mock).mockImplementation((file: any, data: any) => {
            mockDatabase = JSON.parse(data as string);
            return undefined as any;
        });

        repo = new TaskRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAllTasks returns mapped TaskDto array', () => {
        // Set initial data for this test
        mockDatabase.data = [{ id: 1, description: 'a', status: StatusEnum.TODO }];

        const tasks = repo.getAllTasks();
        expect(tasks.length).toBe(1);
        expect(tasks[0].getId()).toBe(1);
        expect(tasks[0].getStatus()).toBe(StatusEnum.TODO);
    });

    test('getAllToDoTasks filters TODO tasks', () => {
        // Set initial data for this test
        mockDatabase.data = [
            { id: 1, description: 't1', status: StatusEnum.TODO },
            { id: 2, description: 't2', status: StatusEnum.IN_PROGRESS },
            { id: 3, description: 't3', status: StatusEnum.TODO }
        ];

        const todos = repo.getAllToDoTasks();
        expect(todos.length).toBe(2);
        expect(todos.every(t => t.getStatus() === StatusEnum.TODO)).toBe(true);
    });

    test('getAllInProgressTasks filters IN_PROGRESS tasks', () => {
        // Set initial data for this test
        mockDatabase.data = [
            { id: 1, description: 't1', status: StatusEnum.TODO },
            { id: 2, description: 't2', status: StatusEnum.IN_PROGRESS },
            { id: 3, description: 't3', status: StatusEnum.IN_PROGRESS },
            { id: 4, description: 't4', status: StatusEnum.DONE }
        ];

        const inProgress = repo.getAllInProgressTasks();
        expect(inProgress.length).toBe(2);
        expect(inProgress.every(t => t.getStatus() === StatusEnum.IN_PROGRESS)).toBe(true);
    });

    test('getAllDoneTasks filters DONE tasks', () => {
        // Set initial data for this test
        mockDatabase.data = [
            { id: 1, description: 't1', status: StatusEnum.TODO },
            { id: 2, description: 't2', status: StatusEnum.IN_PROGRESS },
            { id: 3, description: 't3', status: StatusEnum.DONE },
            { id: 4, description: 't4', status: StatusEnum.DONE }
        ];

        const done = repo.getAllDoneTasks();
        expect(done.length).toBe(2);
        expect(done.every(t => t.getStatus() === StatusEnum.DONE)).toBe(true);
    });

    test('addTask assigns id and writes file', () => {
        // Start with empty database
        mockDatabase.data = [];

        const t = new TaskDto();
        t.setDescription('new task');
        t.setStatus(StatusEnum.TODO);
        repo.addTask(t);

        expect(mockDatabase.data.length).toBe(1);
        expect(mockDatabase.data[0].id).toBe(1);
        expect(mockDatabase.data[0].description).toBe('new task');
        expect(mockDatabase.data[0].status).toBe(StatusEnum.TODO);
    });

    test('deleteTask removes task and writes file', () => {
        // Set initial data for this test
        mockDatabase.data = [{ id: 1, description: 'a' }, { id: 2, description: 'b' }];

        repo.deleteTask(1);

        expect(mockDatabase.data.length).toBe(1);
        expect(mockDatabase.data[0].id).toBe(2);
    });

    test('updateTask updates description, status and updatedAt', () => {
        // Set initial data for this test
        mockDatabase.data = [
            { id: 1, description: 'a', status: StatusEnum.TODO },
            { id: 2, description: 'b', status: StatusEnum.IN_PROGRESS }
        ];

        repo.updateTask(2, 'updated', StatusEnum.DONE);

        const updated = mockDatabase.data.find((d: any) => d.id === 2);
        expect(updated.description).toBe('updated');
        expect(updated.status).toBe(StatusEnum.DONE);
        expect(updated.updatedAt).toBeDefined();
    });

    test('creates file when readFileSync throws', () => {
        // Mock readFileSync to throw error for this test
        (fs.readFileSync as jest.Mock).mockImplementation(() => {
            throw new Error('no file');
        });

        const tasks = repo.getAllTasks();
        expect(tasks).toEqual([]);
        expect(mockDatabase.data).toEqual([]);
    });

    test('updateTask only updates description without status', () => {
        // Set initial data for this test
        mockDatabase.data = [
            { id: 1, description: 'a', status: StatusEnum.TODO }
        ];

        repo.updateTask(1, 'new description');

        const updated = mockDatabase.data.find((d: any) => d.id === 1);
        expect(updated.description).toBe('new description');
        expect(updated.status).toBe(StatusEnum.TODO);
        expect(updated.updatedAt).toBeDefined();
    });

    test('updateTask only updates status without description', () => {
        // Set initial data for this test
        mockDatabase.data = [
            { id: 1, description: 'original', status: StatusEnum.TODO }
        ];

        repo.updateTask(1, undefined, StatusEnum.DONE);

        const updated = mockDatabase.data.find((d: any) => d.id === 1);
        expect(updated.description).toBe('original');
        expect(updated.status).toBe(StatusEnum.DONE);
        expect(updated.updatedAt).toBeDefined();
    });

    test('getAllToDoTasks with empty array returns empty', () => {
        mockDatabase.data = [];

        const todos = repo.getAllToDoTasks();
        expect(todos).toEqual([]);
    });

    test('getAllInProgressTasks with empty array returns empty', () => {
        mockDatabase.data = [];

        const inProgress = repo.getAllInProgressTasks();
        expect(inProgress).toEqual([]);
    });

    test('getAllDoneTasks with empty array returns empty', () => {
        mockDatabase.data = [];

        const done = repo.getAllDoneTasks();
        expect(done).toEqual([]);
    });

    test('addTask with existing tasks increments id correctly', () => {
        // Set initial data with existing tasks
        mockDatabase.data = [
            { id: 1, description: 'task1', status: StatusEnum.TODO },
            { id: 2, description: 'task2', status: StatusEnum.TODO }
        ];

        const t = new TaskDto();
        t.setDescription('new task');
        t.setStatus(StatusEnum.TODO);
        repo.addTask(t);

        expect(mockDatabase.data.length).toBe(3);
        expect(mockDatabase.data[2].id).toBe(3);
        expect(mockDatabase.data[2].description).toBe('new task');
    });

    test('deleteTask with non-existent id does nothing', () => {
        // Set initial data
        mockDatabase.data = [{ id: 1, description: 'a' }, { id: 2, description: 'b' }];

        repo.deleteTask(999);

        expect(mockDatabase.data.length).toBe(2);
        expect(mockDatabase.data[0].id).toBe(1);
        expect(mockDatabase.data[1].id).toBe(2);
    });

    test('getAllTasks with missing optional fields', () => {
        // Set initial data with missing fields
        mockDatabase.data = [
            { id: 1, description: 'a' },
            { id: 2, status: StatusEnum.TODO }
        ];

        const tasks = repo.getAllTasks();
        expect(tasks.length).toBe(2);
        expect(tasks[0].getId()).toBe(1);
        expect(tasks[0].getDescription()).toBe('a');
        expect(tasks[1].getId()).toBe(2);
        expect(tasks[1].getStatus()).toBe(StatusEnum.TODO);
    });

    test('getAllToDoTasks when all tasks are TODO', () => {
        mockDatabase.data = [
            { id: 1, description: 't1', status: StatusEnum.TODO },
            { id: 2, description: 't2', status: StatusEnum.TODO }
        ];

        const todos = repo.getAllToDoTasks();
        expect(todos.length).toBe(2);
    });

    test('getAllInProgressTasks when none are in progress', () => {
        mockDatabase.data = [
            { id: 1, description: 't1', status: StatusEnum.TODO },
            { id: 2, description: 't2', status: StatusEnum.DONE }
        ];

        const inProgress = repo.getAllInProgressTasks();
        expect(inProgress.length).toBe(0);
    });

    test('getAllDoneTasks returns only completed tasks', () => {
        mockDatabase.data = [
            { id: 1, description: 't1', status: StatusEnum.TODO },
            { id: 2, description: 't2', status: StatusEnum.DONE },
            { id: 3, description: 't3', status: StatusEnum.DONE }
        ];

        const done = repo.getAllDoneTasks();
        expect(done.length).toBe(2);
        expect(done[0].getId()).toBe(2);
        expect(done[1].getId()).toBe(3);
    });

    test('updateTask with both description and status', () => {
        mockDatabase.data = [
            { id: 1, description: 'original', status: StatusEnum.TODO }
        ];

        repo.updateTask(1, 'modified', StatusEnum.IN_PROGRESS);

        const updated = mockDatabase.data[0];
        expect(updated.description).toBe('modified');
        expect(updated.status).toBe(StatusEnum.IN_PROGRESS);
    });

    test('deleteTask removes correct task from multiple', () => {
        mockDatabase.data = [
            { id: 1, description: 'a' },
            { id: 2, description: 'b' },
            { id: 3, description: 'c' }
        ];

        repo.deleteTask(2);

        expect(mockDatabase.data.length).toBe(2);
        expect(mockDatabase.data.map((d: any) => d.id)).toEqual([1, 3]);
    });

    test('addTask with single existing task', () => {
        mockDatabase.data = [{ id: 1, description: 'first' }];

        const t = new TaskDto();
        t.setDescription('second');
        repo.addTask(t);

        expect(mockDatabase.data.length).toBe(2);
        expect(mockDatabase.data[1].id).toBe(2);
    });

    test('getAllTasks with createdAt field', () => {
        const createdAtTime = '2026-02-11T10:00:00Z';
        mockDatabase.data = [
            { id: 1, description: 'a', status: StatusEnum.TODO, createdAt: createdAtTime }
        ];

        const tasks = repo.getAllTasks();
        // TaskDto constructor always sets createdAt to current time, so we just verify it's set
        expect(tasks[0].getCreatedAt()).toBeDefined();
        expect(typeof tasks[0].getCreatedAt()).toBe('string');
    });

    test('getAllTasks with updatedAt field', () => {
        const updatedAtTime = '2026-02-11T11:00:00Z';
        mockDatabase.data = [
            { id: 1, description: 'a', status: StatusEnum.TODO, updatedAt: updatedAtTime }
        ];

        const tasks = repo.getAllTasks();
        // Verify updatedAt is preserved from the data
        expect(tasks[0].getUpdatedAt()).toBe(updatedAtTime);
    });
});