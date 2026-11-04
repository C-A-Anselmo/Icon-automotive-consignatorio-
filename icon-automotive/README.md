# ICON-automotive · Sitio web de la concesionaria

Sitio estático hecho solo con **HTML, CSS y JavaScript** (sin frameworks ni herramientas de compilación). Se abre directo en VS Code y es compatible con **GitHub Pages**.

## 1. Qué incluye
- **index.html**: inicio, catálogo dinámico de 3 autos, servicios, nosotros (con fundadores y contadores), testimonios y contacto.
- **car.html**: segunda página con la **ficha completa** de cada auto (especificaciones por grupos, equipamiento, historial y otros modelos).
- Menú fijo que pasa de transparente a negro con borde dorado, menú hamburguesa en celular, animaciones al hacer scroll, navegación con flechas del teclado y deslizar en el celular.
- Respeta `prefers-reduced-motion` (si el usuario pidió menos animación, se desactivan).

## 2. Estructura de carpetas
```
icon-automotive/
├── index.html          Página principal (textos, contacto, horarios)
├── car.html            Ficha completa de cada auto (se arma sola)
├── css/styles.css      Estilos y paleta de colores (variables al inicio)
├── js/
│   ├── main.js         Comportamiento + bloque IMAGES (hero y about)
│   ├── cars-data.js    Catálogo de autos (precios, specs, fotos)
│   └── car-detail.js   Arma la ficha de car.html
├── images/
│   ├── brand/logo.png  Escudo de la marca (fondo transparente)
│   ├── hero/           Imagen de portada (opcional)
│   ├── cars/           Fotos de los autos (opcional)
│   └── about/          Imagen de "Nosotros" (opcional)
├── README.md
└── .gitignore
```

## 3. Cómo abrirlo en VS Code
1. Abrí VS Code → **File → Open Folder** → elegí `icon-automotive`.
2. Instalá la extensión **Live Server** (autor: Ritwick Dey) desde el panel de extensiones.
3. Click derecho sobre `index.html` → **Open with Live Server**. Se abre en el navegador y se actualiza solo al guardar.
4. También funciona haciendo doble click en `index.html` (sin servidor).

## 4. Cómo cambiar los TEXTOS
Todos los textos están en `index.html`. Buscá con **Ctrl+F** la frase que querés cambiar.

| Qué | Dónde buscar |
|---|---|
| Título del navegador / descripción | `<title>` y `<meta name="description">` arriba |
| Frase del hero | `class="hero__slogan"` y `class="hero__sub"` |
| Servicios | `<article class="service ...">` |
| Fundadores | `<ul class="founders">` |
| Contadores | `data-count="15"` (el número) y `data-suffix="+"` |
| Testimonios | `<figure class="quote">` |

Ejemplo (antes → después):
```html
<!-- ANTES -->
<p class="hero__slogan">Manejá tu ícono</p>
<!-- DESPUÉS -->
<p class="hero__slogan">Tu próximo auto te espera</p>
```
Contadores: `<span class="stat__num" data-count="15" ...>` → cambiá `15` por `20` para mostrar "20+".

## 5. Cómo cambiar las IMÁGENES
- **Hero y Nosotros**: abrí `js/main.js`, bloque `IMAGES` (arriba de todo).
- **Autos**: `js/cars-data.js`, campo `images` de cada auto.
- **Logo**: reemplazá `images/brand/logo.png` (PNG con fondo transparente, ~500×700 px).

Tamaños recomendados: hero **1920×1080**, autos **1200×800**, nosotros **1000×1250**. Usá formato **JPG** (fotos) o **WebP**, y nombres sin espacios ni tildes: `sedan-1.jpg`, `deportivo-2.jpg`.

**Pasar de URL a archivos locales:**
1. Copiá tus fotos a `images/cars/`, `images/hero/` o `images/about/`.
2. Cambiá la dirección:
```js
// ANTES (Unsplash)
{ src: U("1618843479313-40f8afb4b4d8"), alt: "Sedán de lujo negro..." }
// DESPUÉS (archivo local)
{ src: "images/cars/sedan-1.jpg", alt: "Sedán negro visto de frente" }
```
3. Actualizá siempre el texto `alt` para que describa la foto real.

Si una imagen no carga, la web muestra un degradado esmeralda/negro en su lugar (no se rompe nada).

## 6. Cómo editar, agregar o quitar autos (`js/cars-data.js`)
Cada auto es un bloque dentro de la lista `CARS`. Para **editar**, cambiá los valores. Para **quitar**, borrá el bloque completo (de `{` a `},`). El diseño del catálogo está pensado para **3 autos**; si agregás más, ajustá `grid-template-columns: repeat(3, 1fr)` en `.catalog__tabs` (css).

Para **agregar**, copiá un bloque entero y cambiá estos campos:
```js
{
  id: "mi-auto-nuevo",        // único, sin espacios (se usa en car.html?id=...)
  type: "Hatchback premium",
  brand: "Marca", model: "Modelo", year: 2024,
  price: 45000,               // USD, sin puntos ni símbolo
  images: [ { src: "images/cars/nuevo-1.jpg", alt: "Descripción" }, /* ... 4 fotos */ ],
  specs: { engine: "...", horsepower: "...", /* mismas claves que los otros autos */ },
  description: "Texto corto.",
  features: ["Característica 1", "Característica 2"],
  details: [ { title: "Motor y rendimiento", rows: [["Cilindrada", "1.998 cc"]] } ],
  equipment: [ { title: "Exterior", items: ["Faros LED"] } ]
}
```
`details` y `equipment` alimentan la **ficha completa** (`car.html`). Los datos incluidos son **de ejemplo**: reemplazalos por los reales de cada unidad.

## 7. Cómo cambiar la paleta de colores
En `css/styles.css`, bloque `:root` (arriba de todo):
```css
--emerald: #0B6B4F;   /* verde principal */
--gold: #C9A24B;      /* dorado */
```
Cambiás el valor y se actualiza toda la web.

## 8. Contacto, redes y horarios
En `index.html`, sección `<!-- DATOS DE CONTACTO -->`: teléfono (`href="tel:..."` y texto), email (`mailto:`), horarios y los links de redes (`href="#"` → poné tu URL). No se muestra dirección física; si querés agregarla, sumá un bloque `<div><dt>Dirección</dt><dd>...</dd></div>` dentro de `info__list`.

> El formulario valida los datos pero **no envía nada** (no hay servidor). Para recibir los mensajes podés conectar un servicio como Formspree o EmailJS en la función `initForm` de `js/main.js`.

## 9. Subirlo a GitHub y publicarlo con GitHub Pages
1. Instalá Git y creá una cuenta en github.com.
2. En la carpeta del proyecto, abrí la terminal de VS Code (**Ctrl+ñ**) y ejecutá:
```bash
git init
git add .
git commit -m "Primera versión de ICON-automotive"
git branch -M main
```
3. En GitHub: **New repository** → nombre `icon-automotive` → **Create repository** (sin README).
4. Conectá y subí (reemplazá `TU-USUARIO`):
```bash
git remote add origin https://github.com/TU-USUARIO/icon-automotive.git
git push -u origin main
```
5. En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main / (root) → Save**.
6. Después de 1–2 minutos, la web queda en `https://TU-USUARIO.github.io/icon-automotive/`.

Para actualizar después: `git add .` → `git commit -m "Cambios"` → `git push`.

## 10. Problemas frecuentes (FAQ)
- **No se ven las fotos de los autos**: las de ejemplo vienen de Unsplash y necesitan internet; además alguna URL puede haber cambiado. Reemplazalas por archivos propios (sección 5).
- **Cambié algo y no se ve**: guardá el archivo (Ctrl+S) y recargá con Ctrl+F5.
- **car.html muestra otro auto**: el `id` en la dirección (`car.html?id=...`) tiene que coincidir con un `id` de `cars-data.js`.
- **Pantalla en blanco / catálogo vacío**: abrí la consola (F12) y buscá errores; casi siempre es una coma o llave de más en `cars-data.js`.
- **En GitHub Pages no carga el CSS**: revisá que los nombres de carpetas y archivos estén en minúscula, exactamente como en el código.

## 11. Licencia y créditos
- Código: libre para uso educativo y comercial del proyecto ICON-automotive.
- Fotos de ejemplo: [Unsplash](https://unsplash.com) (licencia Unsplash). Reemplazalas por fotos propias antes de publicar.
- Tipografías: Cormorant Garamond y Montserrat (Google Fonts, licencia SIL OFL).
- **Logo**: el escudo es la imagen aportada por el equipo; confirmá que tenés derecho a usarlo públicamente.
- Marcas y modelos del catálogo: nombres de ejemplo; pertenecen a sus respectivos fabricantes.
