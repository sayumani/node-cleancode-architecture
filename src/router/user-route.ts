import express from 'express'

import { UserHandler } from '../handler/user-handler';
import { UserUsecase } from '../usecase/user-usecase';
import { UserRepository } from '../repository/user-repository';

const ur = new UserRepository()
const uc = new UserUsecase(ur)
const uh = new UserHandler(uc)

const userRouter = express.Router();
userRouter.get('/', uh.getAllUser)

export default userRouter