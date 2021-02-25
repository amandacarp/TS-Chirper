import { Query } from '../';
import {User, SQLRes} from '../../../common/types';

const all = () => Query<User[]>('SELECT * FROM users');
const one = (id: User['id']) => Query<User[]>('SELECT * FROM users WHERE id = ?', [id]);
const insert = (newUser: User) => Query<SQLRes>('INSERT INTO users SET ?', [newUser]);
const find = (column: string, value: string | number) => Query<User[]>('SELECT * FROM users WHERE ?? = ?', [column, value]);



export default {
    all,
    one,
    insert,
    find
}