import { Query } from './index';

const delete_mention = async (chirpid: number) => Query('DELETE FROM Mentions WHERE chirpid = ?', [chirpid]);


export default {
    delete_mention
}