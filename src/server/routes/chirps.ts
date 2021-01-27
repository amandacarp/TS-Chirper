import * as express from 'express';
import db from '../db'

const router = express.Router();


router.get('/api/chirps', async (req, res) => {
    try {
        res.json(await db.Chirps.all());
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
});


export default router;







// const chirpStore = require('../chirpstore');


// router.get('/:id?', (req, res, next) => {
//     const id = req.params.id
//     const chirps = id ? chirpStore.GetChirp(id) : chirpStore.GetChirps()
//     if(id){
//         res.json({id, ...chirps}) 
//     } else {
//         const newChirps = Object.keys(chirps).map(key => {
//             return {
//                 id:key,
//                 user: chirps[key].user,
//                 msg: chirps[key].msg
//             }
//         })
//         newChirps.pop()
//         res.json(newChirps.reverse())
//     }   
// })

// router.post('/', (req, res, next) => {
//     const chirp = req.body
//     chirpStore.CreateChirp(chirp)
//     res.send("Chirp created")
// })

// router.put('/:id', (req, res, next) => {
//     const chirpID = req.params.id;
//     const chirpInfo = req.body
//     chirpStore.UpdateChirp(chirpID, chirpInfo)
//     res.send(`chirp ${chirpID} edited`);
// })

// router.delete('/:id', (req, res, next) => {
//     const chirpID = req.params.id;
//     chirpStore.DeleteChirp(chirpID);
//     res.send(`chirp ${chirpID} deleted!`)
// } )

