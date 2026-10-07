# Configurar Ozzen Burger

Editá `public/config.json`. La web lo consulta al abrir cada página. En un hosting estático podés reemplazar `config.json` junto a `index.html` sin recompilar JavaScript. En Sites, guardá y publicá los cambios para actualizar la versión visible.

## Datos del local
- `name`: nombre de la marca.
- `instagram` e `instagramHandle`: enlace completo y usuario visible.
- `zone` y `region`: zona y provincia visibles.
- `address`: dirección exacta. Vacío la oculta.
- `hours`: horarios en texto. Vacío los oculta.
- `mapsUrl`: enlace HTTPS de Google Maps. Vacío oculta Cómo llegar.
- `whatsapp`: número internacional, solo dígitos (o + inicial). Vacío oculta pedidos.
- `menuUrl`: enlace HTTPS opcional a carta PDF o externa. No reemplaza la página /menu.

## Carta
`menu.categories` admite categorías, cada una con `id`, `name`, `description` opcional e `items`.
Cada producto admite `id`, `name`, `description`, `price` (número, sin símbolos), `image` (ruta /assets/ o URL HTTPS), `badge` y `available`.
`available: false` oculta el producto. Omitir `price` lo muestra sin precio. Sin imágenes se usan tarjetas de texto. Se ocultan categorías vacías. `currency` define la moneda (ARS por defecto).

Estructura de ejemplo — reemplazá los textos y cargá únicamente productos reales:
```json
{
  "id": "categoria-1",
  "name": "Nombre de categoría",
  "items": [
    {
      "id": "producto-1",
      "name": "Nombre real del producto",
      "description": "Descripción e ingredientes confirmados",
      "price": 0,
      "image": "",
      "badge": "",
      "available": true
    }
  ]
}
```
Pegá categorías dentro de `menu.categories`. Cambiá el precio de ejemplo antes de publicar. Se dejó la lista vacía para no inventar productos ni precios; mientras tanto la página dirige al Instagram real.

La página /menu incluye filtros por categoría. Accedé desde el botón Menú de la navegación o Ver menú de la portada. No se implementa carrito ni pago online.
