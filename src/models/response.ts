import { UserApp } from "./user";

export interface GetUsersResponse {
    page: number,
    resultCount: number,
    nextPage: boolean,
    users: UserApp[]
}