# Instalación y configuración técnica

## Requisitos

- Node.js 24 para ejecutar todas las pruebas (la integración utiliza `node:sqlite`).
- pnpm 11.25.0, la versión indicada en `package.json`.
- Cloudflare D1 y R2 para ejecución persistente, con bindings `DB` y `BUCKET`.
- Un proveedor de identidad confiable: esta versión utiliza Sign in with ChatGPT en Sites.

## Instalar y verificar

Desde la carpeta del proyecto, con pnpm disponible:

```bash
pnpm install --frozen-lockfile
node tests/core.mjs
node tests/integration.mjs
pnpm exec tsc --noEmit
pnpm build
```

No se necesita una base de producción para las pruebas de integración. Se utiliza SQLite en memoria y almacenamiento simulado. Las pruebas cubren autorización, archivos, aprobación, asignaciones, lectura/examen, límite de intentos, versiones y recuperación. No equivalen a una prueba visual ni de infraestructura productiva.

## Desarrollo local

```bash
pnpm dev
```

En un clon normal, el adaptador de desarrollo permite una identidad simulada **solo en loopback** (`localhost`/`127.0.0.1`): correo `seedy@sites.test`. No representa al propietario real ni es un mecanismo de autenticación productiva. Para usar esa identidad en la prueba local, configura `ORG_OWNER_EMAIL=seedy@sites.test` en el entorno del Worker local, aplica las migraciones al D1 local y mantén los mismos bindings `DB` y `BUCKET`.

El arranque por sí solo no provisiona datos ni garantiza una sesión funcional: D1, R2 y la variable del propietario deben estar disponibles en el Worker. El ejemplo `.dev.vars.example` contiene únicamente el correo de prueba; configura el archivo local según el runtime de Wrangler/Vite y nunca lo subas.

## Base de datos

Las migraciones SQL están en `drizzle/` y deben aplicarse en orden: `0000`, `0001`, `0002`. Contienen el esquema, no datos de producción. No modifiques una migración ya aplicada: genera otra cuando evolucione `db/schema.ts`.

En Sites, utiliza su mecanismo de migraciones/provisión. Para otro despliegue Cloudflare, configura Wrangler con los identificadores reales de D1/R2 y la ruta de migraciones antes de aplicarlas. Los nombres y el ID de D1 en `vite.config.ts` son valores de desarrollo; no los uses como identificadores productivos.

## Entorno productivo

`ORG_OWNER_EMAIL` debe contener el correo del propietario y almacenarse como secreto/variable del servidor. El primer acceso válido inicializa la organización. Después, Centro de Calidad permite configurar usuarios, roles, hospitales, áreas y ficha de personal. En el alojamiento privado debe autorizarse también el acceso de las cuentas.

La identidad se lee en `app/chatgpt-auth.ts`. En Sites, el servicio establece los encabezados confiables de identidad. En un alojamiento diferente, sustituye o integra este adaptador con sesiones verificadas en servidor: no publiques una aplicación que confíe directamente en encabezados elegidos por el visitante.

`.openai/hosting.json` conserva las declaraciones `DB`/`BUCKET`, pero omite el ID del sitio existente para evitar vincular esta copia a ese despliegue. El ZIP es una copia de código para GitHub, no un despliegue preconfigurado ni una copia de los datos reales.

## Ubicación de funciones

| Carpeta | Función |
| --- | --- |
| `app/` | Pantallas, estilos y portal |
| `app/api/` | Calidad, formación, archivos, administración e importación |
| `lib/` | Autorización, validación, calificación y respaldos |
| `db/` y `drizzle/` | Esquema y migraciones |
| `public/` | Logotipos y recursos |
| `tests/` | Verificaciones de lógica y flujos |
| `build/` y `scripts/` | Adaptadores y ejecución del alojamiento |

## Antes de abrir operación institucional

Configura nombres reales y usuarios; verifica permisos con cuentas de cada rol; prueba archivos y recuperación en el entorno elegido; completa la validación visual y con usuarios; incorpora manual CEHC; acuerda retención y recuperación externa. No se ha implementado un expediente clínico ni certificación automática.
