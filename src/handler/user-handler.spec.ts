import app from '../app';
import request from 'supertest';
import { UserUsecase } from '../usecase/user-usecase';
import { GetUsersResponse } from '../models/response';

jest.mock('../usecase/user-usecase');

const getUsersResponseSuccess: GetUsersResponse = {
    nextPage: false,
    resultCount: 2,
    page: 1,
    users: [{
        age: 1,
        email: 'svr@test.com',
        phone: 78788788,
        userName: 'svr',
        nickName: 'svr'
    },
    {
        age: 1,
        email: 'svr@test.com',
        phone: 78788788,
        userName: 'svr',
        nickName: 'svr'
    }]
}

const getUsersResponseEmpty: GetUsersResponse = {
    nextPage: false,
    resultCount: 0,
    page: 1,
    users: []
}

describe('GET /user', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should test GET /user', (done) => {
        const ucMock = jest.fn();
        UserUsecase.prototype.getAllUser = ucMock
        ucMock.mockResolvedValue(getUsersResponseSuccess)
        request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                const data = res.body
                expect(data.users.length).toBe(2)
                expect(data.users[0].userName).toBe('svr')
                expect(data.resultCount).toBe(2)
                expect(data.page).toBe(1)
                done()
            })
    })

    test('Should test GET /user empty response', (done) => {
        const ucMock = jest.fn();
        UserUsecase.prototype.getAllUser = ucMock
        ucMock.mockResolvedValue(getUsersResponseEmpty)
        request(app)
            .get('/api/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                const data = res.body
                expect(data.users.length).toBe(0)
                expect(data.resultCount).toBe(0)
                expect(data.page).toBe(1)
                done()
            })
    })

    test('Should test GET /user 500 error', (done) => {
        const ucMock = jest.fn();
        UserUsecase.prototype.getAllUser = ucMock
        ucMock.mockRejectedValue('error')
        request(app)
            .get('/api/user')
            .expect(500)
            .then(res => {
                expect(res.status).toBe(500)
                expect(res.text).toBe("Internal server error")
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})


