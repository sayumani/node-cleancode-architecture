import pool from '../../infrastructure/db';
import { UserApp } from '../models/user';

export class UserRepository {
    getAlluser = async (page: number, resultLimit: number): Promise<any[]> => {
        try {
            const query = `
            SELECT
            *
            FROM
            user_app
            LIMIT $1
            OFFSET $2
            `
            const res = await pool.query(query, [resultLimit + 1, (page - 1) * resultLimit])
            return res.rows
        } catch (err) {
            return err
        }
    }
}