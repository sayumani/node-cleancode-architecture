import pool from '../../infrastructure/db';
import { UserApp } from '../models/user';

export class UserRepository {
    getAlluser = async (): Promise<UserApp[]> => {
        try {
            const query = `
            SELECT
            *
            FROM
            user_app
            `
            const res = await pool.query(query)
            return res.rows
        } catch (err) {
            return err
        }
    }
}