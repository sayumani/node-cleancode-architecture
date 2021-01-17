import { UserApp } from "../models/user";
import { UserRepository } from "../repository/user-repository";
import { GetUsersRequest } from '../models/request';
import { GetUsersResponse } from "../models/response";

export class UserUsecase {
    private userRepo: UserRepository

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    getAllUser = async (req: GetUsersRequest): Promise<GetUsersResponse> => {
        let res = await this.userRepo.getAlluser(req.page, req.resultLimit)
        let nextPage: boolean = false
        if (res && res.length > 0) {
            if (res.length > req.resultLimit) {
                nextPage = true;
                res = res.slice(0, req.resultLimit)
            }
            const usersList: UserApp[] = res.map(user => ({
                age: user.age,
                userName: user.user_name,
                nickName: user.nick_name,
                email: user.email,
                phone: user.mobile
            }))
            const response: GetUsersResponse = {
                page: req.page,
                resultCount: res.length,
                nextPage: nextPage,
                users: usersList
            };
            return response
        }
        else {
            const response: GetUsersResponse = {
                page: req.page,
                resultCount: 0,
                nextPage: nextPage,
                users: []
            };
            return response
        }
    }
}