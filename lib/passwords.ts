import {pbkdf2,randomBytes,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
const derive=promisify(pbkdf2);const iterations=600000;
export function passwordPolicy(password:unknown):asserts password is string{if(typeof password!=='string'||password.length<12||password.length>128)throw Object.assign(new Error('Utiliza una contraseña de entre 12 y 128 caracteres.'),{name:'PasswordPolicyError'});if(/^(password|contrase[nñ]a|123456|saintlukes)/i.test(password))throw Object.assign(new Error('Elige una contraseña menos predecible.'),{name:'PasswordPolicyError'});}
export async function hashPassword(password:string){passwordPolicy(password);const salt=randomBytes(16).toString('hex');const hash=await derive(password,salt,iterations,32,'sha256');return `pbkdf2-sha256$${iterations}$${salt}$${hash.toString('hex')}`;}
export async function verifyPassword(password:string,encoded:string){const [alg,cost,salt,hash]=encoded.split('$');if(alg!=='pbkdf2-sha256'||Number(cost)!==iterations||!/^[a-f0-9]{32}$/.test(salt)||!/^[a-f0-9]{64}$/.test(hash)||password.length>128)return false;const result=await derive(password,salt,iterations,32,'sha256');return timingSafeEqual(result,Buffer.from(hash,'hex'));}
export function secretEqual(a:string,b:string){const aa=Buffer.from(a),bb=Buffer.from(b);return aa.length===bb.length&&timingSafeEqual(aa,bb);}
export function token(){return randomBytes(32).toString('base64url');}
export async function tokenHash(value:string){return Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))).toString('hex');}
