import { UserApp } from "../models/user";
import { UserRepository } from "../repository/user-repository";
export class UserUsecase {
    private userRepo: UserRepository

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo
    }

    getAllUser = async (): Promise<UserApp[]> => {
        const res = await this.userRepo.getAlluser()
        if (res && res.length > 0) {
            return res
        }
        else {
            return []
        }
    }
}