import Workspace from './workspace';
import {requireChatGPTUser} from './chatgpt-auth';
import {access} from '../lib/access';
export const dynamic='force-dynamic';
export default async function Page(){await requireChatGPTUser('/');try{const a=await access();return <Workspace name={a.name} accessInfo={a}/>}catch(e){return <main style={{maxWidth:650,margin:'12vh auto',padding:30}}><img src="/saint-lukes-color.png" alt="Saint Luke’s Hospitals" width="220"/><h1 style={{marginTop:30}}>Acceso pendiente</h1><p style={{marginTop:15}}>{(e as Error).message}</p><p>Solicita al administrador que registre tu cuenta y autorice tu acceso al sitio privado.</p><a href="/signout-with-chatgpt?return_to=/" target="_top">Cambiar cuenta</a></main>}}
