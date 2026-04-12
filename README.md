# 🛍️ TechStore - Tienda En Línea Profesional

Una tienda online moderna y completamente funcional construida con **Python Flask**, **HTML5**, **CSS3** y **JavaScript puro**. Todo listo para ejecutar, personalizar y desplegar en línea.

> ✨ **Proyecto 100% terminado:** Backend completo, Frontend profesional, diseño responsivo, APIs JSON e imágenes reales.

## 📋 Características

- ✅ **Diseño Moderno y Responsivo** - Se adapta perfectamente a cualquier dispositivo
- ✅ **Sistema de Navegación Completo** - Menú principal, búsqueda y carrito
- ✅ **Catálogo de Productos** - Más de 16 productos con filtrado por categoría
- ✅ **Sistema de Categorías** - 6 categorías diferentes con descripción
- ✅ **Página de Inicio** - Con secciones destacadas, testimonio y promociones
- ✅ **Página Acerca de** - Historia, misión, visión y valores de la empresa
- ✅ **Carrito Local** - Almacenamiento en localStorage
- ✅ **Dark Footer** - Profesional y completo
- ✅ **Optimización SEO** - Metaetiquetas y estructura semántica
- ✅ **Interfaz en Español** - Todos los textos en español

## 📂 Estructura

```
techstore/
├── app.py                 # Backend Flask
├── requirements.txt       # Dependencias
├── README.md              # Documentación
├── templates/             # HTML (5 plantillas)
│   ├── base.html          # Plantilla base
│   ├── index.html         # Inicio
│   ├── catalogo.html      # Catálogo (16 productos)
│   ├── categorias.html    # Categorías (6)
│   └── acerca.html        # Acerca de
└── static/                # Archivos estáticos
    ├── css/estilos.css    # CSS (1500+ líneas)
    ├── js/main.js         # JavaScript (300+ líneas)
    └── images/            # Carpeta para imágenes
```

## 🚀 Instalación Rápida

### Requisitos
- Python 3.8+
- pip

### Pasos

```bash
# 1. Clonar
git clone https://github.com/tu-usuario/techstore.git
cd techstore

# 2. Entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux

# 3. Instalar
pip install -r requirements.txt

# 4. Ejecutar
python app.py
```

**Abre:** http://localhost:5000 ✅

## 📖 Uso

### Páginas Disponibles

1. **Inicio (`/`)** - Página principal con hero section, productos destacados y categorías
2. **Catálogo (`/catalogo`)** - Todos los productos con filtrado y búsqueda
3. **Categorías (`/categorias`)** - Todas las categorías disponibles
4. **Acerca de (`/acerca`)** - Información de la empresa, equipo y trayectoria

### Funcionalidades

- **Agregar al Carrito** - Haz clic en el botón "Agregar al Carrito" en cualquier producto
- **Filtrar por Categoría** - En el catálogo, utiliza la barra lateral izquierda
- **Buscar Productos** - Usa el icono de búsqueda en la navbar
- **Ver Detalles** - Haz clic en "Ver Detalles" para información completa del producto

## 🎨 Personalización

### Agregar un Producto

Edita `app.py`:

```python
{
    'id': 17,
    'nombre': 'Nuevo Producto',
    'precio': 99.99,
    'categoria': 'Electrónica',
    'descripcion': 'Descripción',
    'imagen': 'https://images.unsplash.com/photo-...',
    'destacado': False
}
```

### Cambiar Colores

Edita `static/css/estilos.css`:

```css
:root {
    --color-primario: #007bff;
    --color-primario-oscuro: #0056b3;
    /* ... más variables ... */
}
```

### Usar Imágenes Locales

1. Coloca imagen en `static/images/`
2. Usa: `'/static/images/nombre.jpg'` en app.py

## 🔌 API REST

```bash
GET /api/productos               # Obtener todos
GET /api/productos?categoria=... # Filtrar por categoría
GET /api/categorias              # Obtener categorías
GET /api/producto/<id>           # Detalles de producto
POST /api/agregar-carrito        # Agregar al carrito
```

### Ejemplo JavaScript:

```javascript
fetch('/api/productos?categoria=Electrónica')
    .then(r => r.json())
    .then(data => console.log(data));
```

## 🌐 Desplegar Online

### Azure Web App (⭐ Recomendado)
- 💰 Gratis 30 días ($200 crédito)
- 🔒 HTTPS automático
- 🚀 Deploy desde Git en 10 minutos
- URL: `https://tu-app.azurewebsites.net`

### Otras opciones
- **Heroku** - `git push heroku main`
- **Railway/Render** - Sube el repo, configuran automáticamente
- **PythonAnywhere** - Sube los archivos y configura

Detalles en [GUIA_RAPIDA.md](GUIA_RAPIDA.md)

## � Solución de Problemas

| Problema | Solución |
|----------|----------|
| **Puerto 5000 en uso** | Cambia en app.py: `app.run(port=5001)` |
| **Imágenes no cargan** | Verifica URLs, limpia caché (Ctrl+Shift+R) |
| **ModuleNotFoundError** | `pip install -r requirements.txt` |

## 📚 Stack Técnico

- **Backend**: Flask 3.0.0, Python 3.8+
- **Frontend**: HTML5, CSS3, JavaScript puro
- **Storage**: localStorage (carrito)

## 📝 Licencia

MIT - Usa, modifica y comparte libremente.

## 📞 Soporte

- [Flask Docs](https://flask.palletsprojects.com/)
- [GUIA_RAPIDA.md](GUIA_RAPIDA.md) - Guía completa
- Revisa los comentarios en el código

---

**¡Gracias por usar TechStore!** 🎉
