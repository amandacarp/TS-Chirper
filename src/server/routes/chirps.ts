import * as express from 'express';
import db from '../db'

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

router.delete('/:chirpid', async (req, res) => {
    const chirpid = Number(req.params.chirpid);
    try {
        const result = await db.Mentions.delete_mention(chirpid);
        res.json(result);
        console.log(`Chirp ${chirpid} deleted!`)
    } catch (e) {
        res.status(500).send(e)
    }
});

router.delete('/:id'), async (req, res) => {
    const id = Number(req.params.id);
    try {
        const results = await db.Chirps.delete_chirp(id);
        res.json(results)
        console.log(`Chirp ${id} deleted`)
    } catch (error) {
        res.status(500).send(error)
    }
}

router.post('/', async (req, res) => {
    const userid = 1
    const chirpText = req.body.content
    const chirpLocation = req.body.location
    try {
        const result = await db.Chirps.add_chirp(userid, chirpText, chirpLocation);
        res.json(result);
        console.log(`Chirp added!`)
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