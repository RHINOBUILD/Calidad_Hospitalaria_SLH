# Configuración técnica

El servidor utiliza cuentas propias. La guía de publicación y los pendientes de infraestructura están en [DESPLIEGUE_INDEPENDIENTE.md](DESPLIEGUE_INDEPENDIENTE.md).

## Desarrollo local

Requiere Node 24, pnpm 11.25.0 y los bindings DB/D1 y BUCKET/R2. Instalar con `pnpm install --frozen-lockfile`. Copiar `.dev.vars.example` a `.dev.vars` y configurar un correo y una clave de instalación de prueba de al menos 32 caracteres. Este archivo local se excluye de Git.

Ejecutar `pnpm run db:migrate:local`, después `pnpm dev`. Abrir `/setup` para crear al propietario; luego `/login`. No se inyectan usuarios de prueba automáticamente. Las cookies HTTP de desarrollo solo se emiten en localhost; producción requiere HTTPS.

## Verificación

`pnpm run test:core`, `pnpm run test:integration`, `pnpm run test:auth`, `pnpm run typecheck`, `pnpm run build`.

Las pruebas cubren autorización, evidencias, aprobación, formación, exámenes, versiones, respaldos y autenticación. Utilizan SQLite en memoria y almacenamiento simulado; no certifican la infraestructura publicada ni el cumplimiento normativo.

## Estructura

| Carpeta | Función |
| --- | --- |
| app/ | Pantallas y portal |
| app/api/ | Rutas autenticadas y flujos de acceso |
| lib/ | Sesiones, contraseñas, permisos y lógica |
| db/ y drizzle/ | Esquema y migraciones 0000–0003 |
| public/ | Logotipos y recursos |
| tests/ | Verificaciones automatizadas |
| build/app-worker.ts | Servidor independiente |
| wrangler.jsonc | Bindings de Cloudflare |

Las migraciones no contienen datos institucionales. No modificar migraciones ya aplicadas. Los archivos históricos de Sites permanecen como referencia, pero `vite.config.ts` utiliza el servidor independiente y no sus adaptadores de identidad.

GitHub Pages conserva temporalmente el destino anterior. Cambiar la redirección únicamente al disponer de una URL HTTPS independiente publicada y verificada.
