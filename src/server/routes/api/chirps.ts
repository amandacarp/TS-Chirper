import * as express from 'express';
import db from '../../db'
import { Chirp, User } from '../../../common/types';
import * as passport from 'passport';

const router = express.Router();


router.get('/:id?', async (req, res) => {
    const id: Chirp['id'] = Number(req.params.id);
    try {
        const result = id ? await db.Chirps.by_id(id) : await db.Chirps.all();
        res.json(result);
    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/:id', passport.authenticate('jwt'), async (req: any, res) => {
    const id: Chirp['id'] = Number(req.params.id);
    const userid: User['id'] = req.user.userid
    try {
        db.Mentions.delete_mention(id)
            .then(() => {
                db.Chirps.delete_chirp(id, userid)
            })
        res.status(200).send(`Chirp ${id} deleted!`)
        console.log(`Chirp ${id} deleted!`)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.post('/', passport.authenticate('jwt'), async (req: any, res) => {
    const location = req.body.location;
    const content = req.body.content;
    const userid: User['id'] = req.user.userid
    try {
        const result = await db.Chirps.add_chirp(location, content, userid);
        res.json(result);
        console.log(`Chirp # ${result.insertId} added!`)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.put('/:id', passport.authenticate('jwt'), async (req: any, res) => {
    const id: Chirp['id'] = Number(req.params.id)    
    const userid: User['id'] = req.user.userid
    const content: Chirp['content'] = req.body.content
    try {
        const result = await db.Chirps.edit_chirp(content, id, userid);
        res.json(result);
        console.log(`Chirp ${id} edited!`)
    } catch (e) {
        res.status(500).send(e)
    }
})


export default router;