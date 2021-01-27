import { Query } from './index';

const all = async () => Query('SELECT * FROM Chirps')

export default {
    all
}