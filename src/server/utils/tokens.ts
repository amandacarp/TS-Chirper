import config from '../config';
import * as jwt from 'jsonwebtoken'; 
import { IPayload } from '../../common/types';

export function signToken(payload: IPayload){
    return jwt.sign(
         payload, 
         config.jwt.secret, 
         { expiresIn: config.jwt.expires})
 }