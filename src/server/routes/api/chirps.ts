import * as express from 'express';
import db from '../../db'
import { Chirp, User } from '../../../common/types';

const router = express.Router();


router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = id ? await db.Chirps.by_id(id) : await db.Chirps.all();
        res.json(result);
    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = Number(req.params.id);
    try {
        db.Mentions.delete_mention(id)
            .then(() => {
                db.Chirps.delete_chirp(id)
            })
        res.status(200).send(`Chirp ${id} deleted!`)
        console.log(`Chirp ${id} deleted!`)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.post('/', async (req, res) => {
    const userid: User["id"] = 1
    const chirpText: Chirp["content"] = req.body.content
    const chirpLocation: Chirp["location"] = req.body.location
    try {
        const result = await db.Chirps.add_chirp(userid, chirpText, chirpLocation);
        res.json(result);
        console.log(`Chirp # ${result.insertId} added!`)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const chirpText = req.body.content
    const chirpLocation = req.body.location
    try {
        const result = await db.Chirps.edit_chirp(chirpText, chirpLocation, id);
        res.json(result);
        console.log(`Chirp ${id} edited!`)
    } catch (e) {
        res.status(500).send(e)
    }
})


export default router;