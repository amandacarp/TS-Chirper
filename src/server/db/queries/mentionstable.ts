import { Query } from '../index';
import { Mention } from '../../../common/types'

const delete_mention = async (id: Mention["chirpid"]) => Query('DELETE FROM Mentions WHERE chirpid = ?', [id]);


export default {
    delete_mention
}