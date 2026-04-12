# 🚀 Guía Rápida - TechStore

## Instalación en 5 pasos

### 1️⃣ Requisito: Python 3.8+

Verifica que tengas Python:
```bash
python --version
```

### 2️⃣ Crear Entorno Virtual

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3️⃣ Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 4️⃣ Ejecutar la Aplicación

```bash
python app.py
```

### 5️⃣ Abrir en el Navegador

Abre: **http://localhost:5000**

---

## ✨ Características Principales

### Páginas
- ✅ **Inicio** - Hero section, productos destacados
- ✅ **Catálogo** - 16+ productos con filtros
- ✅ **Categorías** - 6 categorías diferentes
- ✅ **Acerca de** - Historia y valores de la empresa

### Funcionalidades
- 🛒 Carrito local (localStorage)
- 🔍 Búsqueda de productos
- 🎨 Diseño moderno y responsivo
- 📱 Compatible con móviles
- 🌙 Interfaz profesional

---

## 📝 Estructura de Carpetas

```
python-web/
├── app.py                 ⚡ Aplicación Flask
├── requirements.txt       📦 Dependencias
├── templates/             🎨 Páginas HTML
│   ├── base.html          (Navigation + Footer)
│   ├── index.html         (Página de Inicio)
│   ├── catalogo.html      (Lista de Productos)
│   ├── categorias.html    (Categorías)
│   └── acerca.html        (Sobre Nosotros)
└── static/                📂 Archivos Estáticos
    ├── css/
    │   └── estilos.css    🎨 Estilos
    ├── js/
    │   └── main.js        ⚙️ JavaScript
    └── images/            🖼️ Imágenes
```

---

## 🎯 Personalizaciones Rápidas

### Cambiar Nombre de la Tienda

Edit `templates/base.html`:
```html
<span>Mi Tienda</span>  <!-- Cambiar TechStore -->
```

### Agregar un Nuevo Producto

Edit `app.py`, en la lista `productos`:
```python
{
    'id': 17,
    'nombre': 'Mi Producto',
    'precio': 199.99,
    'categoria': 'Electrónica',
    'descripcion': 'Descripción aquí',
    'imagen': '/static/images/mi-producto.jpg',
    'destacado': False
}
```

### Cambiar Color Principal

Edit `static/css/estilos.css`:
```css
--color-primario: #007bff;  /* Cambiar este color */
```

---

## 🌐 Rutas Disponibles

| Ruta | Descripción |
|------|------------|
| `/` | Página de inicio |
| `/catalogo` | Catálogo de productos |
| `/categorias` | Página de categorías |
| `/acerca` | Acerca de la tienda |
| `/api/productos` | API - Todos los productos |
| `/api/categorias` | API - Todas las categorías |

---

## 🔧 API REST

```javascript
// Obtener todos los productos
fetch('/api/productos')
    .then(r => r.json())
    .then(data => console.log(data));

// Obtener por categoría
fetch('/api/productos?categoria=Electrónica')
    .then(r => r.json())
    .then(data => console.log(data));

// Agregar al carrito
fetch('/api/agregar-carrito', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        producto_id: 1, 
        cantidad: 1 
    })
})
```

---

## 💾 Guardar Cambios

Todos los cambios se guardan en archivos:

- **Python**: `app.py` (⚠️ Reinicia servidor con Ctrl+C y `python app.py`)
- **HTML**: `templates/*.html` (Actualiza página - F5)
- **CSS**: `static/css/estilos.css` (Vacía caché - Ctrl+Shift+R)
- **JavaScript**: `static/js/main.js` (Vacía caché - Ctrl+Shift+R)

---

## 📱 Responsive Design

La tienda se adapta a:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Escritorio (1200px+)

Prueba con F12 → Dispositivos

---

## 🐛 Errores Comunes

### "Port 5000 is already in use"
```bash
# Usa otro puerto:
# Edita app.py: app.run(port=5001)
```

### "ModuleNotFoundError: Flask"
```bash
pip install Flask==3.0.0
```

### Las imágenes no se cargan
- Coloca imágenes en `static/images/`
- Usa rutas: `/static/images/nombre.jpg`

### CSS/JS no se actualiza
- Presiona: **Ctrl + Shift + R** (borra caché)

---

## 🚀 Desplegar Online

### PythonAnywhere (Recomendado para principiantes)
1. Crea cuenta en pythonanywhere.com
2. Sube tus archivos
3. Configura Web App → Flask
4. ¡Listo! Tienda en línea

### Heroku
```bash
heroku create
git push heroku main
```

### Railway/Render
- Solo sube tu repo
- Ellos detectan Flask automáticamente

---

## 📚 Próximos Pasos

1. ✅ Personaliza colores y textos
2. ✅ Agrega tus propias imágenes
3. ✅ Añade más productos
4. ✅ Implementa autenticación
5. ✅ Integra pasarela de pagos

---

## 💬 Ayuda

- 📖 **Documentación** → README.md
- 🔗 **Flask Docs** → flask.palletsprojects.com
- 📞 **Soporte** → Revisa código comentado

---

## ✅ Checklist Inicial

- [ ] Python instalado
- [ ] Entorno virtual activado
- [ ] Dependencias instaladas (`pip install -r requirements.txt`)
- [ ] Servidor corriendo (`python app.py`)
- [ ] Navegador abierto en `localhost:5000`
- [ ] ¡Tienda funcionando! 🎉

---

**¡Tu tienda online está lista! Ahora personalízala a tu gusto. 🚀**
