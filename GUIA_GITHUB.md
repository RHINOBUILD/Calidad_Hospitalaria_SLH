# Subir la plataforma a GitHub

## Opción recomendada: GitHub Desktop

1. Descomprime el ZIP. Abre la carpeta `saint-lukes-calidad`.
2. En GitHub Desktop elige **File → New repository**, con nombre `saint-lukes-calidad` y una carpeta vacía fuera de la carpeta descomprimida.
3. Copia **el contenido** de `saint-lukes-calidad` al nuevo repositorio. Conserva los archivos que empiezan con punto, como `.gitignore` y la carpeta `.openai`.
4. Revisa los cambios y crea el primer commit: `Plataforma de calidad Saint Luke’s`.
5. Pulsa **Publish repository** y conserva el repositorio privado.

No es necesario copiar `node_modules`, `dist` ni archivos de credenciales: no están incluidos.

## Alternativa: Git por terminal

Dentro de la carpeta descomprimida:

```bash
git init
git add .
git commit -m "Plataforma de calidad Saint Luke's"
git branch -M main
```

Crea un repositorio vacío y privado en GitHub, sin README ni licencia generados automáticamente. Sustituye `TU_USUARIO` por tu usuario real:

```bash
git remote add origin https://github.com/TU_USUARIO/saint-lukes-calidad.git
git push -u origin main
```

Autentícate mediante el gestor de credenciales de Git/GitHub. No escribas un token dentro de la URL ni del código.

## Si utilizas el navegador

Crea el repositorio privado y utiliza **Add file → Upload files**. Sube el contenido de la carpeta raíz, no el ZIP. Para muchos archivos, usa GitHub Desktop o Git; comprueba que también se incluyan `.openai/hosting.json` y `.gitignore`.

## Qué ocurre después

Subir el código no publica una segunda plataforma ni cambia el sitio que ya está funcionando. GitHub Pages no es adecuado para este proyecto completo. La autenticación, D1, R2, secretos, migraciones y despliegue deben configurarse en el alojamiento elegido; consulta `CONFIGURACION.md`.

Nunca subas bases reales, expedientes, respaldos descargados, `.env`, `.dev.vars`, tokens o contraseñas. La exportación no contiene estos datos.
