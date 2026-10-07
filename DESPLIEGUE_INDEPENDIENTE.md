# Saint Luke’s: publicación independiente

Esta versión del servidor utiliza cuentas propias (correo y contraseña); no necesita una sesión de ChatGPT. GitHub almacena el código. GitHub Pages solo sirve archivos estáticos y no ejecuta las API, la base de datos ni el almacenamiento protegido de esta aplicación.

## Estado de publicación

El servidor independiente todavía no está publicado. El `index.html` de GitHub Pages conserva el destino anterior para mantener el enlace existente mientras se prepara la migración. Ese destino conserva la autenticación de ChatGPT. Solo después de desplegar y verificar el nuevo servidor se debe cambiar ese destino y publicar el acceso directo.

El dominio proporcionado es www.rhinobuild.org. Falta identificar su proveedor y disponer de acceso al alojamiento y DNS. Se propone utilizar calidad.rhinobuild.org, sujeto a confirmar su disponibilidad, para preservar el sitio que ya ocupa el dominio principal. No hay dominio nuevo configurado en el código.

## Desplegar en Cloudflare Workers, D1 y R2

El runtime del proyecto está preparado para estos servicios; un hosting estático o únicamente PHP no ejecutará este paquete directamente. Ejecutar con Node 22.13 o superior y pnpm 11.25.0. Las pruebas utilizan node:sqlite; ejecutar con Node 24.

1. Instalar: `pnpm install --frozen-lockfile`.
2. Conectar la cuenta autorizada: `pnpm exec wrangler login`.
3. Crear base de datos: `pnpm exec wrangler d1 create saint-lukes-quality`.
4. Sustituir el ID de ejemplo de `wrangler.jsonc` por el ID real devuelto. No publicar con el ID de ejemplo.
5. Crear almacenamiento: `pnpm exec wrangler r2 bucket create saint-lukes-quality-files`.
6. Aplicar esquema: `pnpm run db:migrate:remote`. Para una instalación con datos existentes, respaldar y migrar también la base y los objetos R2. No asumir que cambiar el código transporta los datos del sitio anterior.
7. Configurar secretos mediante el panel de Cloudflare o CLI interactiva: `pnpm exec wrangler secret put ORG_OWNER_EMAIL` y `pnpm exec wrangler secret put AUTH_SETUP_TOKEN`. La clave de instalación debe tener al menos 32 caracteres aleatorios. No incorporarlos a GitHub ni compartirlos en el chat.
8. Validar: `pnpm run typecheck`, `pnpm run test:core`, `pnpm run test:integration`, `pnpm run test:auth`, `pnpm run build`.
9. Publicar: `pnpm run deploy`.
10. Abrir HTTPS `/setup`, introducir el correo configurado, la clave de instalación y una contraseña nueva. La configuración inicial solo puede completarse una vez. Eliminar el secreto AUTH_SETUP_TOKEN después de completarla.
11. Añadir el dominio/subdominio autorizado en Workers y configurar su DNS. Verificar HTTPS, login, carga/descarga de evidencias y separación entre usuarios de hospitales distintos.
12. Actualizar las tres referencias del destino anterior en `index.html` con la URL HTTPS verificada; entonces el enlace de GitHub Pages redirigirá a la plataforma independiente.

## Uso inicial

El propietario puede configurar cuatro hospitales, registrar personal y asignar usuarios, roles, hospitales y áreas. En Centro de Calidad → Usuarios y permisos: guardar permisos y generar Activar / recuperar. Entregar el enlace al titular por un canal confiable; no hay envío automático. Los enlaces duran 24 horas y son de un solo uso. Para recuperar al propietario, otro administrador no puede generar su enlace: el responsable del servidor necesita un procedimiento de recuperación controlado. No borrar la organización para recuperar acceso.

Las sesiones duran ocho horas. Las contraseñas se almacenan como derivaciones PBKDF2-SHA256 con sal; los tokens de sesión y activación se almacenan como hashes. Hay protección por origen y límites de intentos. Las cookies de producción requieren HTTPS, HttpOnly, Secure y SameSite. El usuario puede cambiar su contraseña desde Mi contraseña; se invalidan sus sesiones anteriores. Suspenderlo impide usar las API y volver a iniciar sesión.

## Alcance y pendientes reales

La aplicación incluye gestión de registros, evidencias, permisos, revisión de Calidad, documentos/versiones, asignaciones, lectura, evaluaciones y constancias internas, bitácora, importación de personal, gráficos y reportes imprimibles. Los cuatro espacios comparten organización y base de datos con autorización por hospital/área en servidor; no son cuatro aplicaciones ni bases separadas.

Esta entrega no equivale a certificación CEHC ni a cumplimiento legal validado. Falta cargar y validar el manual aplicable. SINACEC es seguimiento interno identificado, no canal anónimo. ThermoCare utiliza controles manuales: IoT, WhatsApp, correo/SMS y vigilancia automatizada requieren integraciones. MFA y recuperación automática por correo aún no están implementados. Los respaldos internos se generan al abrir administración o manualmente; deben complementarse con copias externas de D1/R2 y ensayos de restauración. Antes de usar datos clínicos sensibles se necesita revisión de seguridad, privacidad y operación, incluyendo MFA y el esquema de respaldo. No introducir datos identificables de pacientes en los módulos actuales.

Las pruebas automatizadas verifican reglas y rutas usando SQLite/R2 simulados. No sustituyen pruebas sobre el servidor desplegado, dispositivos y usuarios reales. No se realizó una nueva prueba visual en navegador en esta entrega.
