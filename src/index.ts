import { TaskTrackerController } from "./presentation/controllers/task-tracker.controller";

export function main() {
    const args = process.argv.slice(2);
    switch (args[0]) {
        case "add":
            TaskTrackerController.postTask(args);
            break;
        case "update":
            TaskTrackerController.updateTask(args);
            break;
        case "delete":
            TaskTrackerController.deleteTask(args);
            break;
        case "list":
            TaskTrackerController.listTasks();
            break;
        default:
            console.log("Comando não reconhecido. Use 'add', 'update', 'delete' ou 'list'.");
    }
}

main();