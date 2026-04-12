// ==================== INICIALIZACIÓN ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('TechStore - Aplicación iniciada');
    inicializarEventos();
});

// ==================== FUNCIONES PRINCIPALES ====================

/**
 * Inicializa todos los eventos de la aplicación
 */
function inicializarEventos() {
    // Toggle del menú móvil
    const toggleMenu = document.getElementById('toggleMenu');
    const menuNavegacion = document.getElementById('menuNavegacion');
    
    if (toggleMenu) {
        toggleMenu.addEventListener('click', function() {
            this.classList.toggle('activo');
            menuNavegacion.classList.toggle('activo');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.enlace-nav').forEach(enlace => {
            enlace.addEventListener('click', function() {
                toggleMenu.classList.remove('activo');
                menuNavegacion.classList.remove('activo');
            });
        });
    }
    
    // Toggle de la barra de búsqueda
    const abrirBusqueda = document.getElementById('abrirBusqueda');
    const cerrarBusqueda = document.getElementById('cerrarBusqueda');
    const barraBusqueda = document.getElementById('barraBusqueda');
    
    if (abrirBusqueda) {
        abrirBusqueda.addEventListener('click', function() {
            barraBusqueda.classList.add('activa');
            document.getElementById('campoBusqueda').focus();
        });
    }
    
    if (cerrarBusqueda) {
        cerrarBusqueda.addEventListener('click', function() {
            barraBusqueda.classList.remove('activa');
        });
    }
    
    // Tecla Escape para cerrar la búsqueda
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && barraBusqueda) {
            barraBusqueda.classList.remove('activa');
        }
    });
}

// ==================== FUNCIONES DE BÚSQUEDA ====================

/**
 * Realiza la búsqueda de productos
 */
function buscarProductos() {
    const campoBusqueda = document.getElementById('campoBusqueda');
    const terminoBusqueda = campoBusqueda.value.toLowerCase().trim();
    
    if (terminoBusqueda.length === 0) {
        console.log('Campo de búsqueda vacío');
        return;
    }
    
    console.log('Buscando:', terminoBusqueda);
    // Aquí iría la lógica de búsqueda real
    mostrarNotificacion('Búsqueda por: ' + terminoBusqueda);
}

// ==================== FUNCIONES DE CARRITO ====================

/**
 * Agrega un producto al carrito
 * @param {number} productoId - ID del producto
 * @param {string} nombreProducto - Nombre del producto
 * @param {number} precio - Precio del producto
 */
function agregarAlCarrito(productoId, nombreProducto, precio) {
    const cantidad = 1;
    
    const datosCarrito = {
        producto_id: productoId,
        nombre: nombreProducto,
        precio: precio,
        cantidad: cantidad,
        timestamp: new Date().toISOString()
    };
    
    // Obtener carrito actual del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito_techstore')) || [];
    
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.producto_id === productoId);
    
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
        mostrarNotificacion('Cantidad actualizada: ' + nombreProducto);
    } else {
        carrito.push(datosCarrito);
        mostrarNotificacion('✓ ' + nombreProducto + ' agregado al carrito');
    }
    
    // Guardar carrito actualizado
    localStorage.setItem('carrito_techstore', JSON.stringify(carrito));
    
    // Actualizar contador del carrito si existe
    actualizarContadorCarrito();
}

/**
 * Actualiza el contador visual del carrito
 */
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito_techstore')) || [];
    const badgeCarrito = document.querySelector('.badge-carrito');
    
    if (badgeCarrito) {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        badgeCarrito.textContent = totalItems;
        badgeCarrito.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

/**
 * Vacía el carrito completamente
 */
function vaciarCarrito() {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        localStorage.removeItem('carrito_techstore');
        actualizarContadorCarrito();
        mostrarNotificacion('Carrito vaciado');
    }
}

/**
 * Obtiene el contenido del carrito
 * @returns {Array} Array con los productos del carrito
 */
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito_techstore')) || [];
}

// ==================== FUNCIONES DE NOTIFICACIONES ====================

/**
 * Muestra una notificación temporal al usuario
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación (exito, alerta, error)
 * @param {number} duracion - Duración en milisegundos
 */
function mostrarNotificacion(mensaje, tipo = 'exito', duracion = 3000) {
    const notificacion = document.createElement('div');
    
    // Asignar clase según el tipo
    notificacion.className = 'notificacion-agregar';
    if (tipo === 'alerta') {
        notificacion.style.background = '#ffc107';
    } else if (tipo === 'error') {
        notificacion.style.background = '#dc3545';
    }
    
    notificacion.innerHTML = mensaje;
    document.body.appendChild(notificacion);
    
    // Animar entrada
    setTimeout(() => {
        notificacion.classList.add('mostrar');
    }, 10);
    
    // Animar salida y remover
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, duracion);
}

// ==================== FUNCIONES DE PRODUCTOS ====================

/**
 * Obtiene todos los productos desde la API
 * @returns {Promise} Promesa con los productos
 */
async function obtenerProductos() {
    try {
        const respuesta = await fetch('/api/productos');
        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

/**
 * Obtiene los detalles de un producto específico
 * @param {number} productoId - ID del producto
 * @returns {Promise} Promesa con los detalles del producto
 */
async function obtenerDetallesProducto(productoId) {
    try {
        const respuesta = await fetch(`/api/producto/${productoId}`);
        const producto = await respuesta.json();
        return producto;
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        return null;
    }
}

/**
 * Filtra productos por categoría
 * @param {string} categoria - Nombre de la categoría
 * @param {Array} productos - Array de productos a filtrar
 * @returns {Array} Productos filtrados
 */
function filtrarProductosPorCategoria(categoria, productos) {
    if (!categoria) return productos;
    return productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
}

/**
 * Ordena productos según criterio especificado
 * @param {Array} productos - Array de productos a ordenar
 * @param {string} criterio - Criterio de ordenamiento
 * @returns {Array} Productos ordenados
 */
function ordenarProductos(productos, criterio) {
    const productosOrdenados = [...productos];
    
    switch(criterio) {
        case 'precio-menor':
            return productosOrdenados.sort((a, b) => a.precio - b.precio);
        case 'precio-mayor':
            return productosOrdenados.sort((a, b) => b.precio - a.precio);
        case 'nombre-az':
            return productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
        case 'nombre-za':
            return productosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'));
        default:
            return productosOrdenados;
    }
}

/**
 * Busca productos por término
 * @param {string} termino - Término de búsqueda
 * @param {Array} productos - Array de productos
 * @returns {Array} Productos encontrados
 */
function buscarProductosLocales(termino, productos) {
    const terminoMinuscula = termino.toLowerCase();
    return productos.filter(p => 
        p.nombre.toLowerCase().includes(terminoMinuscula) ||
        p.descripcion.toLowerCase().includes(terminoMinuscula) ||
        p.categoria.toLowerCase().includes(terminoMinuscula)
    );
}

// ==================== FUNCIONES DE CATEGORÍAS ====================

/**
 * Obtiene todas las categorías desde la API
 * @returns {Promise} Promesa con las categorías
 */
async function obtenerCategorias() {
    try {
        const respuesta = await fetch('/api/categorias');
        const categorias = await respuesta.json();
        return categorias;
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return [];
    }
}

// ==================== FUNCIONES DE VALIDACIÓN ====================

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido, false en caso contrario
 */
function validarEmail(email) {
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(email);
}

/**
 * Valida un teléfono
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} True si es válido, false en caso contrario
 */
function validarTelefono(telefono) {
    const expresionRegular = /^[\d\s\-\+\(\)]{7,}$/;
    return expresionRegular.test(telefono);
}

/**
 * Valida un formulario
 * @param {HTMLFormElement} formulario - Formulario a validar
 * @returns {boolean} True si es válido, false en caso contrario
 */
function validarFormulario(formulario) {
    const campos = formulario.querySelectorAll('input[required], textarea[required]');
    let esValido = true;
    
    campos.forEach(campo => {
        if (campo.value.trim() === '') {
            campo.classList.add('error');
            esValido = false;
        } else {
            campo.classList.remove('error');
        }
    });
    
    return esValido;
}

// ==================== FUNCIONES DE UTILIDAD ====================

/**
 * Copia un texto al portapapeles
 * @param {string} texto - Texto a copiar
 */
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        mostrarNotificacion('¡Copiado al portapapeles!');
    }).catch(err => {
        console.error('Error al copiar:', err);
        mostrarNotificacion('Error al copiar', 'error');
    });
}

/**
 * Formatea un número como moneda
 * @param {number} numero - Número a formatear
 * @param {string} moneda - Código de moneda (default: 'USD')
 * @returns {string} Número formateado como moneda
 */
function formatearMoneda(numero, moneda = 'USD') {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: moneda,
        minimumFractionDigits: 2
    }).format(numero);
}

/**
 * Formatea una fecha
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

/**
 * Trunca un texto a cierta cantidad de caracteres
 * @param {string} texto - Texto a truncar
 * @param {number} limite - Límite de caracteres
 * @returns {string} Texto truncado
 */
function truncarTexto(texto, limite = 100) {
    if (texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
}

/**
 * Genera un ID único
 * @returns {string} ID único
 */
function generarIdUnico() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ==================== FUNCTIONS PARA ACELERAR CARGA ====================

/**
 * Carga las imágenes de forma perezosa (lazy loading)
 */
function inicializarLazyLoading() {
    if ('IntersectionObserver' in window) {
        const observador = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const imagen = entry.target;
                    if (imagen.dataset.src) {
                        imagen.src = imagen.dataset.src;
                        imagen.removeAttribute('data-src');
                        observer.unobserve(imagen);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            observador.observe(img);
        });
    }
}

/**
 * Animación de scroll suave
 */
function animarScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== FUNCIONES DE RESPONSIVE ====================

/**
 * Detecta si estamos en dispositivo móvil
 * @returns {boolean} True si es móvil
 */
function esMobil() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detecta el ancho de pantalla actual
 * @returns {string} 'xs', 'sm', 'md', 'lg', 'xl'
 */
function obtenerTamanoPantalla() {
    const ancho = window.innerWidth;
    if (ancho < 480) return 'xs';
    if (ancho < 768) return 'sm';
    if (ancho < 992) return 'md';
    if (ancho < 1200) return 'lg';
    return 'xl';
}

// ==================== INICIALIZACIÓN AL CARGAR ====================

// Actualizar contador del carrito al cargar la página
window.addEventListener('load', function() {
    actualizarContadorCarrito();
    inicializarLazyLoading();
    animarScroll();
    console.log('Aplicación completamente cargada');
});

// Actualizar contador del carrito cada vez que se enfoque la ventana (en caso de que otro tab haya hecho cambios)
window.addEventListener('focus', function() {
    actualizarContadorCarrito();
});

// ==================== EXPORTS PARA USO GLOBAL ====================

// Hacer funciones disponibles globalmente
window.agregarAlCarrito = agregarAlCarrito;
window.obtenerCarrito = obtenerCarrito;
window.vaciarCarrito = vaciarCarrito;
window.mostrarNotificacion = mostrarNotificacion;
window.obtenerProductos = obtenerProductos;
window.obtenerCategorias = obtenerCategorias;
window.buscarProductosLocales = buscarProductosLocales;
window.filtrarProductosPorCategoria = filtrarProductosPorCategoria;
window.ordenarProductos = ordenarProductos;
window.formatearMoneda = formatearMoneda;
window.validarEmail = validarEmail;
window.esMobil = esMobil;
window.obtenerTamanoPantalla = obtenerTamanoPantalla;
