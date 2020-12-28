import { Request, Response } from 'express';
import { UserUsecase } from '../usecase/user-usecase';

export class UserHandler {
    private userUseCase: UserUsecase

    constructor(uc: UserUsecase) {
        this.userUseCase = uc
    }

    getAllUser = (req: Request, res: Response) => {
        this.userUseCase.getAllUser().then(users => {
            res.status(200).send(users)
        }).catch(err => {
            res.status(500).send("Internal server error")
        })
    }
}