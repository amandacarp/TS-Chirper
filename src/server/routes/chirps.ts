import * as express from 'express';
const chirpStore = require('../chirpstore');
const router = express.Router();

router.get('/:id?', (req, res, next) => {
    const id = req.params.id
    const chirps = id ? chirpStore.GetChirp(id) : chirpStore.GetChirps()
    if(id){
        res.json({id: id, ...chirps}) 
    } else {
        const newChirps = Object.keys(chirps).map(key => {
            return {
                id:key,
                user: chirps[key].user,
                msg: chirps[key].msg
            }
        })
        newChirps.pop()
        res.json(newChirps.reverse())
    }   
})

router.post('/', (req, res, next) => {
    const chirp = req.body
    chirpStore.CreateChirp(chirp)
    res.send("Chirp created")
})

router.put('/:id', (req, res, next) => {
    const chirpID = req.params.id;
    const chirpInfo = req.body
    chirpStore.UpdateChirp(chirpID, chirpInfo)
    res.send(`chirp ${chirpID} edited`);
})

router.delete('/:id', (req, res, next) => {
    const chirpID = req.params.id;
    chirpStore.DeleteChirp(chirpID);
    res.send(`chirp ${chirpID} deleted!`)
} )

export default router;