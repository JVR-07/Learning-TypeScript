# 📄 SRS: Universal Resource Dashboard

Versión: 1.0 Enfoque: TypeScript Avanzado (Genéricos, Type Guards, Utility Types) Stack: React, TypeScript, Vite.

---

## 1. Introducción y Propósito

El objetivo es construir un Dashboard administrativo capaz de gestionar múltiples tipos de entidades (Productos y Empleados) utilizando una única arquitectura de componentes flexible. El sistema debe ser "agnóstico al tipo de dato" en su capa de visualización y red.

### 1.1 Objetivos de Aprendizaje (Technical Goals)

- **Abstracción:** UI desacoplada de la lógica de negocio específica mediante **Genéricos** (`<T>`).

- **Seguridad de Tipos:** Validación estricta en tiempo de ejecución mediante **Type Narrowing**.

- **Manipulación de Datos:** Transformación de modelos para formularios usando **Utility Types** (`Pick`, `Omit`, `Partial`).

- _Asincronía Robusta:_ Manejo tipado de respuestas de API.

---

## 2. Modelado de Datos (Core Types)

El sistema debe manejar dos entidades principales que comparten una base pero divergen en detalles.

### 2.1 Entidad Base (Interface)

Todas las entidades deben tener:

- `id` (string, UUID)

- `createdAt` (Date o string ISO)

### 2.2 Entidades Específicas

1. **Product:**
   - `kind`: Literal `'product'` (Discriminante).
   - `name`: string.
   - `price`: number.
   - `stock`: number.
   - `status`: `'active' | 'archived'`.

2. **Employee:**
   - `kind`: Literal `'employee'` (Discriminante).
   - `fullName`: string.
   - `email`: string.
   - `role`: `'admin' | 'manager' | 'intern'`.

### 2.3 Union Type

Debe existir un tipo `Resource` que sea la unión de `Product | Employee` para usarse en componentes polimórficos.

---

## 3. Requerimientos Funcionales y Técnicos

**Módulo A: Capa de Red (API Service)**
**Requerimiento:** Crear un cliente HTTP reutilizable.

- **Detalle Técnico (Async/Generics):**
  - Debe existir una función `request<T>(url: string): Promise<T>`.
  - Debe manejar errores `try/catch` y devolver un tipo de respuesta estandarizado.
  - **Simulación:** Usar setTimeout para simular latencia de red.

**Módulo B: Visualización de Datos (La Tabla Maestra)**
**Requerimiento:** Un componente `<DataGrid />` que pueda listar Productos O Empleados sin modificar su código fuente.

- **Detalle Técnico (Genéricos en React):**
  - El componente debe aceptar un prop data: `T[]`.
  - Debe aceptar un prop columns que defina qué campos de `T` mostrar.
  - **Reto:** No usar any. TypeScript debe inferir que si paso `Product[]`, las columnas solo pueden acceder a propiedades de Product.

**Módulo C: Detalles y Lógica Condicional**
**Requerimiento:** Al hacer clic en un ítem de la tabla, mostrar una tarjeta de detalles ("Card").

- **Detalle Técnico (Type Narrowing):**
  - El componente `DetailCard` recibe un Resource.
  - Usar una función `isProduct(item)` (User Defined Type Guard) para:

        - **Si es Producto:** Mostrar botón `"Restock"` (Aumentar stock).
        - **Si es Empleado:** Mostrar botón `"Promote"` (Cambiar rol).

  - El compilador no debe permitir acceder a `item.stock` si no se ha validado que es un producto.

**Módulo D: Gestión y Formularios**
**Requerimiento:** Formularios para crear y editar entidades.

- **Detalle Técnico (Utility Types):**
  - **Creación:** El formulario de creación no debe pedir `id` ni `createdAt`. Definir tipo `CreateProductDTO` usando Omit.
  - **Edición:** La función de actualización debe aceptar un objeto donde todos los campos sean opcionales. Definir `UpdateProductDTO` usando Partial.
  - **Vista Resumida:** Un componente "Avatar" para empleados que solo pida `{ name, email }` usando Pick.

---

## 4. Historias de Usuario (Flujo de la App)

1. **Dashboard Home:** El usuario ve dos botones: "Ver Inventario" y "Ver Equipo".

2. **Listado:** Al entrar a "Inventario", el sistema hace un fetch tipado (`fetch<Product[]>`) y renderiza la DataGrid.

3. **Interacción:** El usuario selecciona un producto. Se abre un modal. El código verifica if (`isProduct`) y muestra el precio en color verde.

4. **Edición Rápida:** El usuario cambia solo el precio de un producto. Se envía al "backend" un objeto `{ price: 99.99 }` (Partial), sin enviar el resto de datos.

## 5. Entregables Esperados

Para considerar el proyecto completado, se debe tener estos archivos clave:

- `types/models.ts:` Definición de interfaces y discriminantes.

- `utils/guards.ts:` Funciones `isProduct` y `isEmployee`.

- `hooks/useFetch.ts`: Hook genérico para llamadas asíncronas.

- `components/GenericTable.tsx`: El componente estrella con `<T>`.

- `services/api.ts`: Simulación de backend con tipos Partial y Omit.
