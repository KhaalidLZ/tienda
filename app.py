# -*- coding: utf-8 -*-
"""
Tienda en Línea - Aplicación Flask
Autor: Desarrollador Senior
Descripción: Sistema completo de comercio electrónico con diseño moderno y responsivo
"""

from flask import Flask, render_template, request, jsonify
from datetime import datetime

# Inicializar la aplicación Flask
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False  # Para soportar correctamente caracteres en español

# ==================== DATOS DE LA TIENDA ====================

# Categorías de productos
categorias = [
    {
        'id': 1,
        'nombre': 'Electrónica',
        'descripcion': 'Dispositivos de última tecnología para tu hogar y trabajo',
        'imagen': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop'
    },
    {
        'id': 2,
        'nombre': 'Ropa y Accesorios',
        'descripcion': 'Prendas de moda y complementos para todas las ocasiones',
        'imagen': 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop'
    },
    {
        'id': 3,
        'nombre': 'Hogar y Decoración',
        'descripcion': 'Elementos para hacer tu casa más cómoda y hermosa',
        'imagen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop'
    },
    {
        'id': 4,
        'nombre': 'Deportes y Fitness',
        'descripcion': 'Equipamiento para mantener un estilo de vida activo',
        'imagen': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop'
    },
    {
        'id': 5,
        'nombre': 'Libros y Medios',
        'descripcion': 'Obras literarias e información para ampliar tu conocimiento',
        'imagen': 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=600&h=400&fit=crop'
    },
    {
        'id': 6,
        'nombre': 'Belleza y Cuidado',
        'descripcion': 'Productos premium para tu bienestar y autocuidado',
        'imagen': 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=400&fit=crop'
    }
]

# Productos del catálogo
productos = [
    {
        'id': 1,
        'nombre': 'Monitor 4K Ultra HD 27"',
        'precio': 599.99,
        'categoria': 'Electrónica',
        'descripcion': 'Monitor de alta resolución con colores vibrantes',
        'imagen': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=500&fit=crop',
        'destacado': True
    },
    {
        'id': 2,
        'nombre': 'Auriculares Inalámbricos Pro',
        'precio': 249.99,
        'categoria': 'Electrónica',
        'descripcion': 'Auriculares con cancelación activa de ruido',
        'imagen': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop',
        'destacado': True
    },
    {
        'id': 3,
        'nombre': 'Teclado Mecánico RGB',
        'precio': 179.99,
        'categoria': 'Electrónica',
        'descripcion': 'Teclado gaming con switches mecánicos de alta calidad',
        'imagen': 'https://images.unsplash.com/photo-1587829191301-6c05b2838554?w=400&h=500&fit=crop',
        'destacado': False
    },
    {
        'id': 4,
        'nombre': 'Mousepad Profesional',
        'precio': 29.99,
        'categoria': 'Electrónica',
        'descripcion': 'Mousepad de alta precisión con superficie suave',
        'imagen': 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=500&fit=crop',
        'destacado': False
    },
    {
        'id': 5,
        'nombre': 'Remera Premium Comfort',
        'precio': 49.99,
        'categoria': 'Ropa y Accesorios',
        'descripcion': 'Remera hecha con algodón 100% orgánico',
        'imagen': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
        'destacado': True
    },
    {
        'id': 6,
        'nombre': 'Zapatillas Running Elite',
        'precio': 139.99,
        'categoria': 'Ropa y Accesorios',
        'descripcion': 'Zapatillas optimizadas para correr con máxima comodidad',
        'imagen': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
        'destacado': False
    },
    {
        'id': 7,
        'nombre': 'Mochila Backpack Resistente',
        'precio': 79.99,
        'categoria': 'Ropa y Accesorios',
        'descripcion': 'Mochila de nylon resistente con múltiples compartimentos',
        'imagen': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop',
        'destacado': False
    },
    {
        'id': 8,
        'nombre': 'Gorro Deportivo Ajustable',
        'precio': 34.99,
        'categoria': 'Ropa y Accesorios',
        'descripcion': 'Gorro deportivo transpirable y ajustable',
        'imagen': 'https://images.unsplash.com/photo-1588668214407-6ea9a3a9efb7?w=400&h=500&fit=crop',
        'destacado': True
    },
    {
        'id': 9,
        'nombre': 'Lámpara LED Inteligente',
        'precio': 89.99,
        'categoria': 'Hogar y Decoración',
        'descripcion': 'Lámpara con control remoto y ajuste de color',
        'imagen': 'https://images.unsplash.com/photo-1565636192335-14c911e3dba0?w=400&h=500&fit=crop',
        'destacado': False
    },
    {
        'id': 10,
        'nombre': 'Almohada Memory Foam',
        'precio': 69.99,
        'categoria': 'Hogar y Decoración',
        'descripcion': 'Almohada de memory foam ergonómica y cómoda',
        'imagen': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop',
        'destacado': False
    },
    {
        'id': 11,
        'nombre': 'Cuadro Moderno Decorativo',
        'precio': 54.99,
        'categoria': 'Hogar y Decoración',
        'descripcion': 'Cuadro moderno con estampado de calidad premium',
        'imagen': 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400&h=500&fit=crop',
        'destacado': False
    },
    {
        'id': 12,
        'nombre': 'Maceta Cerámica Artesanal',
        'precio': 39.99,
        'categoria': 'Hogar y Decoración',
        'descripcion': 'Maceta cerámica hecha a mano con acabado natural',
        'imagen': 'https://images.unsplash.com/photo-1585743860769-81e81b78aeb8?w=400&h=500&fit=crop',
        'destacado': True
    },
    {
        'id': 13,
        'nombre': 'Bicicleta Estática Premium',
        'precio': 799.99,
        'categoria': 'Deportes y Fitness',
        'descripcion': 'Bicicleta estática de cardio con pantalla digital',
        'imagen': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
        'destacado': True
    },
    {
        'id': 14,
        'nombre': 'Juego de Pesas Ajustables',
        'precio': 149.99,
        'categoria': 'Deportes y Fitness',
        'descripcion': 'Juego de pesas de 5kg a 20kg con soporte',
        'imagen': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop',
        'destacado': False
    },
    {
        'id': 15,
        'nombre': 'Colchoneta Yoga Ecológica',
        'precio': 44.99,
        'categoria': 'Deportes y Fitness',
        'descripcion': 'Colchoneta de yoga hecha con materiales ecológicos',
        'imagen': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
        'destacado': False
    },
    {
        'id': 16,
        'nombre': 'Botella Térmica Acero',
        'precio': 59.99,
        'categoria': 'Deportes y Fitness',
        'descripcion': 'Botella térmica de acero inoxidable con aislamiento',
        'imagen': 'https://images.unsplash.com/photo-1602088113235-e3bfb7e6b55a?w=400&h=500&fit=crop',
        'destacado': False
    }
]

# ==================== RUTAS DE LA APLICACIÓN ====================

@app.route('/')
def inicio():
    """Página de inicio/home"""
    # Obtener productos destacados
    productos_destacados = [p for p in productos if p.get('destacado', False)][:3]
    return render_template('index.html', 
                         productos_destacados=productos_destacados,
                         categorias=categorias)

@app.route('/catalogo')
def catalogo():
    """Página del catálogo de productos"""
    # Parámetro para filtrar por categoría (opcional)
    categoria_filtro = request.args.get('categoria', '')
    
    # Filtrar productos si se especifica una categoría
    productos_filtrados = productos
    if categoria_filtro:
        productos_filtrados = [p for p in productos if p['categoria'] == categoria_filtro]
    
    return render_template('catalogo.html',
                         productos=productos_filtrados,
                         categorias=categorias,
                         categoria_activa=categoria_filtro)

@app.route('/categorias')
def categorias_page():
    """Página de categorías"""
    return render_template('categorias.html', categorias=categorias)

@app.route('/acerca')
def acerca():
    """Página acerca de la tienda"""
    return render_template('acerca.html')

# ==================== RUTAS API ====================

@app.route('/api/productos')
def api_productos():
    """API para obtener productos (JSON)"""
    categoria_filtro = request.args.get('categoria', '')
    
    productos_filtrados = productos
    if categoria_filtro:
        productos_filtrados = [p for p in productos if p['categoria'] == categoria_filtro]
    
    return jsonify(productos_filtrados)

@app.route('/api/categorias')
def api_categorias():
    """API para obtener categorías (JSON)"""
    return jsonify(categorias)

@app.route('/api/producto/<int:producto_id>')
def api_producto_detalle(producto_id):
    """API para obtener detalles de un producto"""
    producto = next((p for p in productos if p['id'] == producto_id), None)
    if producto:
        return jsonify(producto)
    return jsonify({'error': 'Producto no encontrado'}), 404

@app.route('/api/agregar-carrito', methods=['POST'])
def api_agregar_carrito():
    """API para agregar producto al carrito (simulated)"""
    datos = request.get_json()
    return jsonify({
        'exito': True,
        'mensaje': 'Producto agregado al carrito exitosamente',
        'producto_id': datos.get('producto_id'),
        'cantidad': datos.get('cantidad', 1)
    })

# ==================== MANEJO DE ERRORES ====================

@app.errorhandler(404)
def pagina_no_encontrada(error):
    """Manejo de página no encontrada"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def error_servidor(error):
    """Manejo de error del servidor"""
    return render_template('500.html'), 500

# ==================== CONFIGURACIÓN DE VARIABLES GLOBALES ====================

@app.context_processor
def inyectar_variables_globales():
    """Inyectar variables disponibles en todos los templates"""
    return {
        'ano_actual': datetime.now().year,
        'total_productos': len(productos),
        'total_categorias': len(categorias),
        'hero_image': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&h=600&fit=crop'
    }

# ==================== INICIALIZACIÓN ====================

if __name__ == '__main__':
    # Configuración para desarrollo local y producción (Azure, Heroku, etc.)
    import os
    
    # Puerto: variable de entorno en Azure, sino 5000
    puerto = int(os.environ.get('PORT', 5000))
    
    # Host: 0.0.0.0 para escuchar en todas las interfaces (necesario para Azure/Heroku)
    host = '0.0.0.0'
    
    # Debug: solo True en desarrollo local
    debug = os.environ.get('FLASK_ENV', 'production') == 'development'
    
    app.run(debug=debug, host=host, port=puerto)
