# Ozzen Burger — listo para Vercel

## Publicar
1. Descomprimí este ZIP.
2. Subí el contenido del proyecto a un repositorio de GitHub.
3. En Vercel: Add New → Project → importá ese repositorio.
4. Framework: Vite. Build: `npm run build`. Output: `dist`. Ya están definidos en vercel.json.
5. Deploy. Compartí la URL de producción con el cliente.

Alternativa desde consola, dentro de la carpeta del proyecto: `npm ci`, y luego `npx vercel --prod` (requiere iniciar sesión en tu cuenta).

## Editar datos y carta
Todo está en `public/config.json`. Las instrucciones y estructura de productos están en `CONFIGURACION.md`. Después de editar, guardá y volvé a desplegar para actualizar también el HTML de SEO.

## SEO
- Inicio y /menu se generan con HTML de contenido completo para buscadores.
- Títulos y descripciones diferentes por página, idioma es-AR.
- Open Graph, Twitter, imagen social y favicon.
- Canonical y sitemap.xml con el dominio real del despliegue.
- robots.txt con la referencia al sitemap.
- Datos estructurados Restaurant usando solo información conocida.
- Los despliegues preview de Vercel usan noindex; producción usa el valor seo.indexable del JSON (true por defecto).

No hay dominio inventado. Vercel completa las URLs con sus variables de sistema al compilar. Para un dominio propio, configurá `seo.siteUrl` en el JSON o la variable `SITE_URL` y desplegá otra vez. Revisá /robots.txt y /sitemap.xml en el dominio publicado.

El sitemap de dist queda vacío en una compilación local sin SITE_URL: se genera completo en Vercel. No subas solamente dist sin recompilar con el dominio correcto.

## Optimización
Imágenes de la landing en WebP. PNG de logo social y favicon comprimidos sin pérdida. Video H.264 original, sin pista de audio (la página es silenciosa) y con faststart para reproducción progresiva. No se redujo la resolución del video ni se volvió a comprimir su imagen.

## Ejecutar en tu PC
- `npm ci`
- `npm run dev`
- `npm run build` para producción.

No incluye node_modules, credenciales, configuración privada de Sites ni archivos de Instagram originales.
