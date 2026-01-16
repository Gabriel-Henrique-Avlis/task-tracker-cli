import { TaskTrackerController } from "./presentation/controllers/task-tracker.controller";

export function main() {
    const taskTrackerController = new TaskTrackerController();
    const args = process.argv.slice(2);
    switch (args[0]) {
        case "add":
            taskTrackerController.postTask(args[1] as string);
            break;
        case "update":
            taskTrackerController.putTask(args[1] as unknown as number, args[2] as string);
            break;
        case "delete":
            taskTrackerController.deleteTask(args[1] as unknown as number);
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
            break;
        case "mark-in-progress":
            taskTrackerController.putTaskStatusInProgress(args[1] as unknown as number);
            break;
        case "mark-todo":
            taskTrackerController.putTaskStatusToDo(args[1] as unknown as number);
            break;
        default:
            console.log("Comando não reconhecido. Use 'add', 'update', 'delete' ou 'list'.");
    }
}

main();