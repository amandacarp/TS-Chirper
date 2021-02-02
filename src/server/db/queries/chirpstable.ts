import { Query } from '../index';
import {Chirp, User, SQLRes} from '../../../common/types'

const all = async () => Query<Chirp[]>('SELECT * FROM Chirps')
const by_id = async (id: Chirp["id"]) => Query<Chirp>('SELECT * FROM Chirps WHERE id = ?', [id]);
const delete_chirp = async (id: Chirp["id"]) => Query('DELETE FROM Chirps WHERE id = ?', [id]);
const add_chirp = async (userid: User["id"], content: Chirp["content"], location: Chirp["location"]) => Query<SQLRes>('INSERT into Chirps SET userid = ?, content = ?, location = ?', [ userid, content, location ]);
const edit_chirp = async (content: Chirp["content"], location: Chirp["location"], id: Chirp["id"]) => Query<SQLRes>('UPDATE Chirps SET content = ?, location = ? WHERE id = ?', [content, location, id])

export default {
    all,
    by_id,
    delete_chirp,
    add_chirp,
    edit_chirp,
}