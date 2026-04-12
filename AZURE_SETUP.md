# 🚀 Desplegar TechStore en Azure Web App

## ⚡ Solución Rápida (5 minutos)

### 1️⃣ Crear Azure Web App

```bash
# Loguéate en Azure
az login

# Crea un grupo de recursos
az group create --name techstore-rg --location eastus

# Crea un plan de App Service
az appservice plan create --name techstore-plan --resource-group techstore-rg --sku B1 --is-linux

# Crea la Web App con Python 3.9
az webapp create --resource-group techstore-rg --plan techstore-plan --name techstore-app --runtime "PYTHON|3.9"
```

### 2️⃣ Desplegar con Git

```bash
cd c:\Users\khaal\Downloads\python web

# Inicializar Git (si no lo hiciste)
git init
git add .
git commit -m "TechStore - Tienda Online"

# Agregar remoto de Azure
git remote add azure https://techstore-app.scm.azurewebsites.net/techstore-app.git

# Hacer push
git push azure master
```

### 3️⃣ Configurar Startup Command en Azure Portal

1. Ve a **Azure Portal** → Tu Web App
2. Menú izquierdo: **Configuration** → **General Settings**
3. En **Startup Command**, copia esto:

```
gunicorn --bind 0.0.0.0 --workers 4 app:app
```

4. **Save** y espera a que reinicie (2-3 minutos)

### 4️⃣ Acceder

Tu app estará en:
```
https://techstore-app.azurewebsites.net
```

---

## 🔧 Archivos Necesarios (ya incluidos)

✅ **Procfile** - Cómo ejecutar la app  
✅ **requirements.txt** - Con `gunicorn` incluido  
✅ **app.py** - Configurado para Azure (host=0.0.0.0)  
✅ **.deployment** - Config de Azure  

---

## 🐛 Si No Carga

### Error: "Application Error"

1. **Revisa los logs:**
   ```bash
   az webapp log tail --name techstore-app --resource-group techstore-rg
   ```

2. **Verifica Startup Command** en Azure Portal

3. **Recarga:** Ctrl+Shift+R en el navegador

### Error: "404 Not Found"

- Verifica que las rutas en app.py sean correctas
- Asegúrate de que `/` retorne `render_template('index.html')`

### CSS/imagenes no cargan

- Verifica que uses `{{ url_for('static', filename='...') }}`
- Todas las imágenes son URLs de Unsplash (no locales)

---

## 📊 Monitoreo

### Ver Estado

```bash
az webapp show --name techstore-app --resource-group techstore-rg
```

### Ver Logs en Tiempo Real

```bash
az webapp log tail --name techstore-app --resource-group techstore-rg -f
```

### Reiniciar App

```bash
az webapp restart --name techstore-app --resource-group techstore-rg
```

---

## 💡 Alternativa: Azure Portal (GUI - Sin comandos)

1. Ve a [portal.azure.com](https://portal.azure.com)
2. New → Web App
3. Rellena:
   - Nombre: `techstore`
   - Runtime: `Python 3.9`
   - Region: `East US`
4. Create
5. En la app → **Deployment Center** → GitHub (conecta tu repo)
6. ¡Listo! Se despliega automáticamente en cada push

---

## 🎯 Variables de Entorno (Opcional)

Si necesitas variables:

1. Azure Portal → Tu app → **Configuration**
2. **Application Settings** → Add
3. Ejemplo:
   ```
   FLASK_ENV = production
   DEBUG = False
   ```

---

## ✅ Checklist Deployement

- [ ] Git inicializado con `git init`
- [ ] Procfile creado
- [ ] requirements.txt con gunicorn
- [ ] app.py con `host='0.0.0.0'`
- [ ] Azure Web App creada
- [ ] Startup Command configurado
- [ ] Push a Azure exitoso
- [ ] App funciona en https://techstore-app.azurewebsites.net

---

**¡Tu tienda está online!** 🎉
