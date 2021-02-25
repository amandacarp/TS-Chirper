import * as passport from 'passport'
import * as LocalStrategy from 'passport-local'
import db from '../db';
import { comparePasswords } from '../utils/password';
import * as PassportJWT from 'passport-jwt';
import config from '../config';
import { IPayload } from '../../common/types';

passport.serializeUser((user, done) => done(null, user)); 
passport.deserializeUser((user, done) => done(null, user)); 

passport.use(new LocalStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => { 
    try {
        const [userRecord] = await db.Users.find('email', email)
        if (userRecord && comparePasswords(password, userRecord.password)) {
            delete userRecord.password; 
            done(null, userRecord); 
        } else {
            done(null, false); 
        }
    } catch (error) {
        done(error);
    }
}));

passport.use(new PassportJWT.Strategy({
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: config.jwt.secret
}, (payload: IPayload, done) => {
    done(null, payload)
}))