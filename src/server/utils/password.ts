
import * as bcrypt from 'bcrypt';

export async function generateHash(password: string) {
    try {
        const salt = await bcrypt.genSalt(12); 
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }

}

export function comparePasswords(attemptedPassword: string, storedPassword: string) {
    return bcrypt.compareSync(attemptedPassword, storedPassword)
}