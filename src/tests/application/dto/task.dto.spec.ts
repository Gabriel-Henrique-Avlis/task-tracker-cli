import { TaskDto } from '../../../application/dto/task.dto';
import { StatusEnum } from '../../../application/enums/status.enum';

describe('TaskDto', () => {
    let task: TaskDto;

    beforeEach(() => {
        task = new TaskDto();
    });

    test('creates task with default values', () => {
        expect(task.getId()).toBeUndefined();
        expect(task.getDescription()).toBe('');
        expect(task.getStatus()).toBe(StatusEnum.TODO);
        expect(task.getCreatedAt()).toBeDefined();
        expect(task.getUpdatedAt()).toBe('');
    });

    test('setId and getId work correctly', () => {
        task.setId(5);
        expect(task.getId()).toBe(5);
    });

    test('setDescription and getDescription work correctly', () => {
        task.setDescription('Test task');
        expect(task.getDescription()).toBe('Test task');
    });

    test('setStatus and getStatus work correctly', () => {
        task.setStatus(StatusEnum.IN_PROGRESS);
        expect(task.getStatus()).toBe(StatusEnum.IN_PROGRESS);

        task.setStatus(StatusEnum.DONE);
        expect(task.getStatus()).toBe(StatusEnum.DONE);
    });

    test('setUpdatedAt and getUpdatedAt work correctly', () => {
        const timestamp = '2026-02-11T10:30:00Z';
        task.setUpdatedAt(timestamp);
        expect(task.getUpdatedAt()).toBe(timestamp);
    });

    test('getCreatedAt returns a valid ISO string', () => {
        const createdAt = task.getCreatedAt();
        expect(createdAt).toBeDefined();
        expect(typeof createdAt).toBe('string');
        // Verify it's a valid ISO string
        expect(() => new Date(createdAt)).not.toThrow();
    });

    test('can set multiple properties on same task', () => {
        task.setId(10);
        task.setDescription('Complete test');
        task.setStatus(StatusEnum.IN_PROGRESS);
        task.setUpdatedAt('2026-02-11T14:00:00Z');

        expect(task.getId()).toBe(10);
        expect(task.getDescription()).toBe('Complete test');
        expect(task.getStatus()).toBe(StatusEnum.IN_PROGRESS);
        expect(task.getUpdatedAt()).toBe('2026-02-11T14:00:00Z');
    });

    test('description persists across multiple calls', () => {
        const desc = 'Persistent description';
        task.setDescription(desc);
        expect(task.getDescription()).toBe(desc);
        expect(task.getDescription()).toBe(desc); // Call again
    });
});
