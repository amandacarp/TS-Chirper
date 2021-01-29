import { Query } from './index';

const delete_mention = async (id: number) => Query('DELETE FROM Mentions WHERE chirpid = ?', [id]);


export default {
    delete_mention
}