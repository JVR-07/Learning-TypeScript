# Configuración del Proyecto e Instalación de TypeScript

## **Pasos para iniciar el entorno de desarrollo desde cero.**

**1. Inicializar el proyecto**
Una vez creada la carpeta donde vamos a trabajar, se debe crear el archivo `package-json` para gestionar las dependencias de `npm`.
Este archivo se crea con el siguiente comando:

```bash
npm init -y
```

**2. Instalación de TypeScript**
Instalamos TypeScript. En este caso se hará como una dependencia de desarrollo, ya que solo lo necesitamos para compilar el código, no para ejecutarlo en producción.

```bash
npm install typescript --save-dev
```

**3. Verificar la Instalación**
Podemos comprobar que se ha instalado correctamente revisando la versión:

```bash
npx tsc --version
```

**4. Inicializar la Configuración de TS**
Para decirle a TypeScript cómo debe comportarse, generamos el archivo `tsconfig.json`:

```bash
npx tsc --init
```

Este archivo es crucial porque define las reglas del compilador (como la versión de JavaScript destino, o qué tan estricto debe ser el chequeo de tipos).
