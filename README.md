# CAVA — El legado de la piel

Landing page premium para una fábrica de botas de piel de León, Guanajuato, con HTML5, CSS3, JavaScript ES6 y cuadrícula Bootstrap 5.

## Abrir

1. Descomprime el archivo ZIP.
2. Abre `index.html` en Chrome, Edge o Firefox.
3. No es necesario instalar Node.js ni compilar.

Las fotografías y la maquetación funcionan localmente; las fuentes de Google y Bootstrap 5 se cargan por CDN si hay conexión a internet. El diseño incluye estilos de respaldo para la cuadrícula si Bootstrap no carga.

## Datos que deben personalizarse antes de publicar

- **Logotipo:** reemplaza el tratamiento tipográfico provisional `CAVA` de `index.html` por el archivo oficial exacto; consulta `assets/brand/README.txt`. No se proporcionó el logotipo del empaque en esta solicitud.
- **WhatsApp, correo y redes:** edita el objeto `SITE_CONTACT` al principio de `js/main.js`. Los botones muestran un aviso explícito mientras no estén configurados; no se inventan datos.
- **Fotografías:** los cinco archivos WebP son **imágenes conceptuales generadas por IA**, no fotos reales de productos CAVA ni de su fábrica. Sustitúyelos por fotografías auténticas aprobadas de la marca antes del lanzamiento. Si se usan fotografías de bancos, revisa sus licencias y permisos de marcas/personas visibles.
- **SEO y redes:** reemplaza las etiquetas OG, agrega URL canónica y detalles sociales cuando exista dominio oficial.
- **Historia y contenido:** valida las afirmaciones institucionales con CAVA.

## Estructura

```
CAVA-Landing/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
│   ├── brand/README.txt
│   └── images/
│       ├── hero-cava.webp
│       ├── artesania-cava.webp
│       ├── clasica-cava.webp
│       ├── western-cava.webp
│       ├── artesanal-cava.webp
│       └── grain.svg
└── README.md
```

## Características

- Maquetación responsive para móvil, tablet y escritorio.
- Cabecera fija con menú móvil accesible y navegación entre secciones.
- Hero editorial, historia, colección de tres estilos y contacto.
- Animaciones progresivas discretas usando IntersectionObserver.
- Cumple `prefers-reduced-motion`.
- Carga diferida de imágenes secundarias, prioridad de carga para hero.
- Etiquetas semánticas, descripciones alternativas, información Open Graph y Schema.org básica.
- Año dinámico y botones de contacto configurables sin información ficticia.

© CAVA. Entregable de concepto web.
