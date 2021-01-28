import { Query } from './index';

const all = async () => Query('SELECT * FROM Chirps')
const by_id = async (id: number) => Query('SELECT * FROM Chirps WHERE id = ?', [id]);
const delete_chirp = async (id: number) => Query('DELETE FROM Chirps WHERE id = ?', [id]);
const add_chirp = async (userid: number, content: string, location: string) => Query('INSERT into Chirps SET userid = ?, content = ?, location = ?', [ userid, content, location ]);
const edit_chirp = async (content: string, location: string, id: number) => Query('UPDATE Chirps SET content = ?, location = ? WHERE id = ?', [content, location, id])

export default {
    all,
    by_id,
    delete_chirp,
    add_chirp,
    edit_chirp
}