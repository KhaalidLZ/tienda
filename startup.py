#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script para iniciar la aplicación en Azure Web App
Azure lo ejecuta automáticamente en el directorio raíz
"""

import os
import sys

if __name__ == '__main__':
    os.environ.setdefault("FLASK_APP", "app.py")
    os.environ.setdefault("FLASK_ENV", "production")
    
    from app import app
    
    # Puerto asignado por Azure
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
