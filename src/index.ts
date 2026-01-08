import { TaskTrackerController } from "./presentation/task-tracker.controller";

export async function main() {
    let executeTask = new TaskTrackerController();
    executeTask.getAllTasks();
}

main();