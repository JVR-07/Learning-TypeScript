# 01-tsconfig.md

Este archivo documenta la configuración fundamental del compilador de TypeScript (tsc) para nuestro proyecto.

## ⚙️ Configuración Base

El archivo `tsconfig.json` es el cerebro de TypeScript. Controla cómo el código se transforma de `.ts` a `.js`.

**1. 🎯 Target y Module**
Definen la compatibilidad y el formato del código resultante.

**target:** "ESNext" — Indica que queremos usar las funciones más modernas de JavaScript, aprovechando que usamos Node v25.

**module:** "NodeNext" — El estándar moderno para manejar importaciones y exportaciones en Node.js.

**2. 🛡️ Modo Estricto (strict)**
Es la opción más importante para el aprendizaje.

**strict:** `true` Activa todas las comprobaciones de seguridad. Nos obliga a definir tipos y evita errores comunes como el uso accidental de any o problemas con valores null/undefined.

**3. 📂 Estructura de Carpetas**
Para mantener el orden, separamos la fuente del resultado:

**rootDir:** `./src` — Donde escribiremos nuestro código TypeScript.

**outDir:** `./dist` — Donde TypeScript guardará los archivos JavaScript compilados.

## 🛠️ Comandos Útiles

Para trabajar con TypeScript y este archivo de configuración, utilizaremos los siguientes comandos en la terminal:

- **`npx tsc`:** Lee el archivo `tsconfig.json` y compila todo el proyecto basándose en las reglas que definimos. Los archivos aparecerán en la carpeta `./dist.` 🏗️

- **`npx tsc --watch`:** Activa el "modo observador". TypeScript se queda escuchando cada cambio que guardes en tus archivos `.ts` y los compila automáticamente. ¡Ahorra mucho tiempo! 👀

- **`node dist/archivo.js`:** Ejecuta el código ya transformado usando Node.js. 🚀
