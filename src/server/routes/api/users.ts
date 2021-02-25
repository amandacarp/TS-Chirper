import * as express from 'express';
import * as passport from 'passport';
import db from '../../db';

const router = express.Router();

router.get('/profile', passport.authenticate('jwt'), async (req: any, res) => {
    try {
		const userid = req.user.userid;
		const [profile] = await db.Users.one(userid);
        const chirps = await db.Chirps.find('userid', userid);
        delete profile.password;
		res.json({ profile, chirps });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'i suck at code!', error });
	}
});

export default router;