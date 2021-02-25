import { Query } from '../index';
import {Chirp, SQLRes, User} from '../../../common/types'

const all = () => Query<Chirp[]>('SELECT Chirps.*, Users.name FROM Chirps JOIN Users ON Users.id = Chirps.userid ORDER BY Chirps._created DESC');
const by_id = async (id: Chirp["id"]) => Query<Chirp>('SELECT Chirps.*, Users.name FROM Chirps JOIN Users ON Users.id = Chirps.userid WHERE Chirps.id = ?', [id]);
const delete_chirp = async (id: Chirp["id"], userid: User['id']) => Query('DELETE FROM Chirps WHERE id = ?', [id, userid]);
const add_chirp = async (location: Chirp['location'], content: Chirp['content'], userid: User['id']) => Query<SQLRes>('INSERT INTO Chirps SET location = ?, content = ?, userid = ?', [location, content, userid]);
const edit_chirp = async (content: Chirp['content'], id: Chirp['id'], userid: User['id']) => Query<SQLRes>('UPDATE Chirps SET content = ? WHERE id = ?', [content, id, userid])
const find = (column: string, value: string | number) => Query<Chirp[]>('SELECT * FROM Chirps WHERE ?? = ?', [column, value])

export default {
    all,
    by_id,
    delete_chirp,
    add_chirp,
    edit_chirp,
    find
}