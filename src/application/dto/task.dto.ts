import { StatusEnum } from "../enums/status.enum";
import { randomUUID } from "crypto";
export class TaskDto {
    private id: number;
    private description: string = "";
    private status: StatusEnum = 1;
    private createdAt: string = "";
    private updatedAt: string = "";

    constructor() {
        this.createdAt = new Date().toISOString();
        this.status = StatusEnum.TODO;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getStatus(): StatusEnum {
        return this.status;
    }

    public setStatus(status: StatusEnum): void {
        this.status = status;
    }

    public getCreatedAt() {
        return this.createdAt;
    }

    public getUpdatedAt() {
        return this.updatedAt;
    }

    public setUpdatedAt(updatedAt: string): void {
        this.updatedAt = updatedAt;
    }
}