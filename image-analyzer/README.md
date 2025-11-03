# Analizador de Imágenes con IA para Shopify

Este proyecto permite analizar imágenes automáticamente usando Claude Vision API.

## 📁 Estructura del Proyecto

```
image-analyzer/
├── api/
│   └── analyzeImage.js      # Tu servidor (analiza imágenes)
├── package.json             # Dependencias
├── vercel.json             # Configuración de Vercel
└── README.md               # Este archivo
```

## 🚀 Cómo desplegar en Vercel (SIN GitHub)

### Opción 1: Drag & Drop en Vercel (MÁS FÁCIL)

1. Ve a: https://vercel.com/new
2. Busca la sección "Clone Template"
3. O simplemente descarga este proyecto como ZIP
4. En Vercel, en la página de nuevo proyecto, busca "Import Project"
5. Arrastra la carpeta completa (drag & drop)

### Opción 2: Con Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **En la carpeta del proyecto, ejecuta:**
   ```bash
   vercel
   ```

3. **Sigue las instrucciones:**
   - Selecciona tu cuenta
   - Confirma el proyecto name
   - Espera a que se despliegue

4. **Recibirás una URL como:**
   ```
   https://tu-proyecto-12345.vercel.app
   ```

## 📝 Pasos después de desplegar

1. **Copia tu URL de Vercel** (te la da al desplegar)

2. **Ve a tu página Shopify**

3. **Pega este código en tu página:**
   - Reemplaza `https://TU_PROYECTO_VERCEL.vercel.app` con tu URL real
   - El código está en `shopify_code_con_vercel.html`

4. **¡Listo!** Tu página pública estará funcionando

## 🔑 Nota sobre API Keys

- Los usuarios de tu página pública necesitarán su propia API key de Anthropic (gratis)
- Pueden conseguirla en: https://console.anthropic.com/keys
- Cada usuario ingresa su propia key en el formulario

## 💰 Costos

- **Vercel:** Gratuito para este proyecto
- **Anthropic API:** Pagas solo por lo que uses (muy barato, centavos por imagen)

## ❓ Troubleshooting

### "Failed to fetch"
- Verifica que tu URL de Vercel sea correcta en el código Shopify
- Espera unos segundos después de desplegar

### "API key inválida"
- Confirma que el API key de Anthropic es correcto
- Los keys empiezan con `sk-ant-`

### La imagen tarda mucho
- Es normal, Claude Vision a veces tarda 5-10 segundos
- Depende del tamaño de la imagen

## 📞 Soporte

Si tienes problemas:
1. Verifica la consola (F12 en navegador) para ver errores
2. Asegúrate de que Vercel está activo
3. Prueba con una imagen pequeña primero
