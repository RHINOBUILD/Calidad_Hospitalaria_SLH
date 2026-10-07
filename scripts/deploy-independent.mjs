import fs from 'node:fs';import {spawnSync} from 'node:child_process';
const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
if(config.d1_databases.some(d=>d.database_id==='00000000-0000-4000-8000-000000000000'))throw Error('Configura el ID real de D1 en wrangler.jsonc antes de publicar.');
const result=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js','deploy','--config','dist/server/wrangler.json'],{stdio:'inherit'});process.exit(result.status??1);
