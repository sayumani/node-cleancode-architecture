import { UserUsecase } from "./user-usecase";
import { UserRepository } from "../repository/user-repository";
import { GetUsersRequest } from "../models/request";
import { DEFAULT_PAGE, DEFAULT_RESULT_LIMIT } from "../constants";

const rows = [
    {
        age: 18,
        user_name: 'svr',
        nick_name: 'svr',
        email: 'svr@gmail.com',
        mobile: '1090787878'
    },
    {
        age: 22,
        user_name: 'svr2',
        nick_name: 'svr2',
        email: 'svr2@gmail.com',
        mobile: '1060787878'
    }
]

describe('Should test UserUsecase', () => {
    let userUseCase: UserUsecase
    let userRepo: UserRepository
    const req: GetUsersRequest = {
        page: DEFAULT_PAGE,
        resultLimit: DEFAULT_RESULT_LIMIT
    }

    beforeEach(() => {
        userRepo = new UserRepository()
        userUseCase = new UserUsecase(userRepo)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('test getAllUser() success', async () => {
        userRepo.getAlluser = jest.fn().mockResolvedValue(rows);
        const res = await userUseCase.getAllUser(req)
        expect(res.users.length).toBe(2)
        expect(res.nextPage).toBe(false)
        expect(res.resultCount).toBe(2)
        expect(res.users[0].userName).toBe('svr')
        expect(res.users[1].userName).toBe('svr2')
    })

    test('test getAllUser() zero users', async () => {
        userRepo.getAlluser = jest.fn().mockResolvedValue([]);
        const res = await userUseCase.getAllUser(req)
        expect(res.users.length).toBe(0)
        expect(res.nextPage).toBe(false)
        expect(res.resultCount).toBe(0)
    })
})