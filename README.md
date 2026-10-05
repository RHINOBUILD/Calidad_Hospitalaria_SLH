# Saint Luke’s · Plataforma de Calidad Hospitalaria

Código fuente del piloto operativo: cuatro hospitales/razones sociales, acceso por rol y área, Calidad, documentos, formación y analítica interna.

## Qué contiene

- Panel ejecutivo, comparación por hospital, indicadores y actividad histórica.
- MOCEBPASS y Farmacia: procesos/PNO, personal, asignaciones, cursos y exámenes, cédulas, referencias y diagnósticos.
- Centro de Calidad: revisión y aprobación, archivos protegidos, usuarios/permisos, alertas e importación CSV compatible con Excel.
- Portal del colaborador: documentos asignados, declaración de lectura, exámenes con límite de intentos y constancia interna al aprobar.
- Registros manuales de incidentes, temperatura y epidemiología.
- Historial de cambios, exportación CSV y PDF mediante impresión.
- Copias manuales y copia diaria al abrir administración; recuperación conservando altas posteriores, permisos y auditoría.

## Empezar

Consulta [GUIA_GITHUB.md](GUIA_GITHUB.md) para subirlo a GitHub y [CONFIGURACION.md](CONFIGURACION.md) para instalar, validar y entender sus dependencias.

## Arquitectura real de esta versión

React + TypeScript con Vinext/Vite y componentes shadcn/ui. APIs en `app/api`, Cloudflare D1 (SQLite) y R2. No es una implementación PostgreSQL/NestJS. La identidad procede de Sign in with ChatGPT/Sites; el código no almacena contraseñas. Los permisos se comprueban en servidor.

**GitHub almacena el código; GitHub Pages no ejecuta las APIs ni la base de datos.** El alojamiento vigente es Sites. Un cambio de alojamiento requiere configurar D1/R2 y un proveedor de identidad confiable; no se deben aceptar encabezados de identidad enviados directamente por un visitante.

## Alcance y pendientes

Piloto operativo, no certificación CEHC. El manual, edición y criterios oficiales deben incorporarse cuando estén disponibles. Sensores, notificaciones externas, denuncia anónima y login corporativo aún requieren implementación/integraciones. No registrar pacientes identificables sin la validación institucional correspondiente.

Las constancias se imprimen/guardan como PDF desde el navegador. El CSV de personal admite hasta 200 filas por importación. La tendencia utiliza los últimos 500 cambios autorizados. El respaldo JSON contiene registros y referencias a archivos retenidos en R2; no incluye sus bytes en un ZIP autónomo. La copia diaria se genera al abrir administración, no mediante una tarea en segundo plano.

Las asignaciones y resultados conservan su historial. Cambiar contenido documental exige nueva versión y revisión. Actualizar un examen conserva intentos históricos, pero deja de contarlos para la aprobación actual. La bitácora no ofrece garantías criptográficas de inmutabilidad.

## Procedencia y comprobaciones

Exportación del código publicado, commit `ce193f7c9ed9d12665191c04eee0c7ded0bace5c`. El paquete omite el identificador de despliegue original y archivos temporales. Incluye logotipos, dependencias bloqueadas, migraciones y pruebas, sin datos de la base de producción ni secretos.

Se verificaron pruebas de lógica, pruebas de integración con SQLite/R2 simulados, migraciones y compilación del proyecto original. La validación visual y la operación con servicios de un nuevo alojamiento requieren pruebas adicionales.
