import { Router } from 'express';
import {signToken} from '../../utils/tokens';
import * as passport from 'passport';

const router = Router();

router.post('/', passport.authenticate('local') , async (req: any, res) => {
    try {
        const token = signToken({ userid: req.user.id })
        res.json(token);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.sqlMessage)
    }
    
})


export default router;