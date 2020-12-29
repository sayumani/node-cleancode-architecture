import { UserApp } from "./user";

export interface GetUsersResponse {
    page: number,
    resultLimit: number,
    nextPage: boolean,
    users: UserApp[]
}