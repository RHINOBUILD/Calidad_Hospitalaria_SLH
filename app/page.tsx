import Workspace from './workspace';
import {redirect} from 'next/navigation';
import {getCurrentUser} from '../lib/auth';
import {access} from '../lib/access';
import {LogoutButton} from './account-controls';
export const dynamic='force-dynamic';
export default async function Page(){if(!await getCurrentUser())redirect('/login');try{const a=await access();return <Workspace name={a.name} accessInfo={a}/>}catch(e){return <main style={{maxWidth:650,margin:'12vh auto',padding:30}}><img src="/saint-lukes-color.png" alt="Saint Luke’s Hospitals" width="220"/><h1>Acceso pendiente</h1><p>{(e as Error).message}</p><p>Solicita al administrador que registre tu cuenta y autorice tus hospitales y áreas.</p><LogoutButton/></main>}}
