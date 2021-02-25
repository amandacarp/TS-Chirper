import { Router } from 'express';
import db from '../../db';
import { generateHash } from '../../utils/password'; 
import { signToken } from '../../utils/tokens';

const router = Router();

router.post('/', async (req, res) => {
    const newUser = req.body 
    try {
        newUser.password = await generateHash(newUser.password); 
        const result = await db.Users.insert(newUser); 
        const token = signToken({userid: result.insertId, email: newUser.email}) 
        res.json(token) 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'you have an error', error: error.sqlMessage })
    }
})

export default router;