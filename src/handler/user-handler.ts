import { Request, Response } from 'express';
import { GetUsersRequest } from '../models/request';
import { UserUsecase } from '../usecase/user-usecase';
import { DEFAULT_PAGE, RESULT_LIMIT } from '../constants';

export class UserHandler {
    private userUseCase: UserUsecase

    constructor(uc: UserUsecase) {
        this.userUseCase = uc
    }

    getAllUser = (req: Request, res: Response) => {
        const { page, resultLimit } = req.query
        const getUsersRequest: GetUsersRequest = {
            page: page ? +page : DEFAULT_PAGE,
            resultLimit: resultLimit ? +resultLimit : RESULT_LIMIT
        }
        this.userUseCase.getAllUser(getUsersRequest).then(resp => {
            res.status(200).send(resp)
        }).catch(err => {
            console.log(err)
            res.status(500).send("Internal server error")
        })
    }
}