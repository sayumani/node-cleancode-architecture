import { Pool } from "pg";
import { UserRepository } from "./user-repository";
import { DEFAULT_PAGE, DEFAULT_RESULT_LIMIT } from "../constants";

const userFetchQuery = `
            SELECT
            *
            FROM
            user_app
            LIMIT $1
            OFFSET $2
            `
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

jest.mock('pg', () => {
    const pool = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Pool: jest.fn(() => pool) };
});

describe('shoul test user repository', () => {
    let pool;
    let userRepo: UserRepository
    beforeEach(() => {
        pool = new Pool();
        userRepo = new UserRepository()
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('getAlluser() successs', async () => {
        pool.query.mockResolvedValueOnce({ rows: rows, rowCount: 2 });
        const res = await userRepo.getAlluser(DEFAULT_PAGE, DEFAULT_RESULT_LIMIT)
        const limit = DEFAULT_RESULT_LIMIT + 1;
        const offset = (DEFAULT_PAGE - 1) * DEFAULT_RESULT_LIMIT
        expect(pool.query).toBeCalledWith(userFetchQuery, [limit, offset]);
        expect(res.length).toBe(2)
        expect(res[0].user_name).toBe('svr')
    })

    test('getAlluser() successs no rows', async () => {
        pool.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
        const res = await userRepo.getAlluser(DEFAULT_PAGE, DEFAULT_RESULT_LIMIT)
        const limit = DEFAULT_RESULT_LIMIT + 1;
        const offset = (DEFAULT_PAGE - 1) * DEFAULT_RESULT_LIMIT
        expect(pool.query).toBeCalledWith(userFetchQuery, [limit, offset]);
        expect(res.length).toBe(0)
    })

    test('getAlluser() error', async () => {
        pool.query.mockResolvedValueOnce(new Error('relation user_app doest not exist'));
        try {
            await userRepo.getAlluser(DEFAULT_PAGE, DEFAULT_RESULT_LIMIT)
        } catch (err) {
            const limit = DEFAULT_RESULT_LIMIT + 1;
            const offset = (DEFAULT_PAGE - 1) * DEFAULT_RESULT_LIMIT
            expect(pool.query).toBeCalledWith(userFetchQuery, [limit, offset]);
            expect(err.message).toBe('relation user_app doest not exist')
        }
    })
})