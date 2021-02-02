import * as mysql from 'mysql';
import Chirps from './queries/chirpstable';
import Mentions from './queries/mentionstable';

export const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'chirprapp',
    password: 'password',
    database: 'chirpr',
});


export const Query = <T = any> (query: string, values?: Array<string | number>) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        })
    })
}

export default {
    Chirps,
    Mentions
}