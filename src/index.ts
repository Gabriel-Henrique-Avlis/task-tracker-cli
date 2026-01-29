import { TaskTrackerController } from "./presentation/controllers/task-tracker.controller";

export function main() {
    const taskTrackerController = new TaskTrackerController();
    const args = process.argv.slice(2);
    switch (args[0]) {
        case "add":
            taskTrackerController.postTask(args[1] as string);
            process.stdout.write("Task added successfully.\n");
            break;
        case "update":
            taskTrackerController.putTask(args[1] as unknown as number, args[2] as string);
            process.stdout.write("Task updated successfully.\n");
            break;
        case "delete":
            taskTrackerController.deleteTask(args[1] as unknown as number);
            process.stdout.write("Task deleted successfully.\n");
            break;
        case "list":
            {
                if (args[1] == "todo") {
                    process.stdout.write(JSON.stringify(taskTrackerController.getToDoTasks()));
                    break;
                } else if (args[1] == "in-progress") {
                    process.stdout.write(JSON.stringify(taskTrackerController.getInProgressTasks()));
                    break;
                } else if (args[1] == "done") {
                    process.stdout.write(JSON.stringify(taskTrackerController.getDoneTasks()));
                    break;
                }
                process.stdout.write(JSON.stringify(taskTrackerController.getAllTasks()));
                break;
            }
        case "mark-done":
            taskTrackerController.putTaskStatusDone(args[1] as unknown as number);
            process.stdout.write("Task marked as done successfully.\n");
            break;
        case "mark-in-progress":
            taskTrackerController.putTaskStatusInProgress(args[1] as unknown as number);
            process.stdout.write("Task marked as in progress successfully.\n");
            break;
        case "mark-todo":
            taskTrackerController.putTaskStatusToDo(args[1] as unknown as number);
            process.stdout.write("Task marked as to-do successfully.\n");
            break;
        default:
            console.log("Unrecognized command. Use 'add', 'update', 'delete' or 'list'.");
    }
}

main();