import { StatusEnum } from "../enums/status.enum";

export class TaskDto {
    private id: string = "";
    private description: string = "";
    private status: StatusEnum = 1;
    private createdAt: string = "";
    private updatedAt: string = "";

    constructor() { }

    public getId(): string {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public getStatus(): StatusEnum {
        return this.status;
    }

    public getCreatedAt() {
        return this.createdAt;
    }

    public getUpdatedAt() {
        return this.updatedAt;
    }
}