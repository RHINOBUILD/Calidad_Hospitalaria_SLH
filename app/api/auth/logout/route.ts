import {database} from '../../../../db/raw';
import {authOrigin,sessionToken,sessionCookie,authError} from '../../../../lib/auth';
import {tokenHash} from '../../../../lib/passwords';
export async function POST(req:Request){try{authOrigin(req);const value=sessionToken(req.headers.get('cookie')||'',new URL(req.url).hostname==='localhost'||new URL(req.url).hostname==='127.0.0.1');if(value)await database().prepare('DELETE FROM auth_sessions WHERE token_hash=?').bind(await tokenHash(value)).run();return new Response(null,{status:303,headers:{Location:'/login','Set-Cookie':sessionCookie(req,'',true),'Cache-Control':'no-store'}})}catch(e){return authError(e)}}
