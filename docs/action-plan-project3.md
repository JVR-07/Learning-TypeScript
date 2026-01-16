# 🗓️ Plan de Acción: Universal Resource Dashboard

## **🟢 Iteración 1: Los Cimientos (Sistema de Tipos)**

**Objetivo:** Definir el contrato de datos estricto. Sin esto, nada funciona.  
**Conceptos:** Interfaces, Union Types, Discriminantes.

- **Tarea 1.1:** Configurar el entorno (Vite + TS).
- **Tarea 1.2:** Crear el archivo `types/models.ts`. Definir Product y Employee usando una propiedad literal (`kind`) para distinguirlos.
- **Tarea 1.3:** Crear el Union Type Resource.

**🤖 Prompt sugerido para esta etapa:** "Actúa como experto en TypeScript. Genérame el archivo types/models.ts. Necesito interfaces para 'Product' y 'Employee' que compartan 'id' y 'createdAt'. Usa 'kind' como propiedad discriminante. Exporta también un tipo 'Resource' que sea la unión de ambos."

## **🔵 Iteración 2: Capa de Datos Genérica (Async & Generics)**

**Objetivo:** Crear un servicio que simule un backend, capaz de devolver cualquier tipo de dato de forma segura.
**Conceptos:** Genéricos `<T>`, Promesas (`Promise<T>`), Async/Await.

- **Tarea 2.1:** Crear un archivo de datos falsos (`db.json` o un array en memoria).

- **Tarea 2.2:** Implementar una función delay para simular latencia.

- **Tarea 2.3:** Crear la función `fetchData<T>`(endpoint) que retorne una Promesa tipada.

**🤖 Prompt sugerido para esta etapa:** "Ahora necesito un servicio simulado `api/service.ts`. Crea una función genérica `fetchData<T>` que acepte una URL, espere 1 segundo (simulado) y devuelva datos tipados como `T`. Incluye manejo de errores básico."

## **🟣 Iteración 3: UI Reutilizable (Componentes Genéricos)**

**Objetivo:** El corazón del proyecto. Un componente que renderice tablas sin saber qué datos recibe.
**Conceptos:** Genéricos en React (`<T extends ...>`), Constraints.

- **Tarea 3.1:** Crear el componente `GenericTable.tsx`.

- **Tarea 3.2:** Definir las props usando genéricos: data: `T[]` y una función renderRow.

- **Tarea 3.3:** Implementar la tabla en `App.tsx` para listar Productos.

**🤖 Prompt sugerido para esta etapa:** "Crea un componente de React llamado `GenericTable`. Debe usar Genéricos para aceptar un array de datos `T` y una prop columns (array de objetos con header y accessor). Asegúrate de que `T` extienda de `{ id: string }` para usarlo como key."

## **🟠 Iteración 4: Lógica Inteligente (Type Narrowing)**

**Objetivo:** Que la aplicación sepa qué hacer con cada dato específico.  
**Conceptos:** User-Defined Type Guards (isProduct), Condicionales.

- **Tarea 4.1:** Crear `utils/guards.ts` con las funciones `isProduct` y `isEmployee`.

- **Tarea 4.2:** Crear un componente `ResourceCard` que reciba un Resource.

- **Tarea 4.3**: Dentro del componente, usar if (`isProduct(item)`) para mostrar botones diferentes (ej: "Reponer Stock" vs "Ver Perfil").

**🤖 Prompt sugerido para esta etapa:** "Ayúdame con el Type Narrowing. Crea un archivo guards.ts con funciones que validen si un recurso es 'Product' o 'Employee'. Luego, dame un ejemplo de un componente React que reciba un Resource y renderice cosas distintas según el tipo, usando esos guards."

## **🔴 Iteración 5: Mutaciones (Utility Types)**

**Objetivo:** Formularios de edición y creación eficientes.
**Conceptos:** `Partial<T>`, `Omit<T>`, `Pick<T>`.

- **Tarea 5.1:** Crear tipos DTO (Data Transfer Object) en `types/form-types.ts` (`CreateProductDTO`, `UpdateEmployeeDTO`).

- **Tarea 5.2:** Simular una función `updateResource` que acepte `Partial<T>`.

- **Tarea 5.3:** Crear un formulario simple que solo pida los campos necesarios.

**🤖 Prompt sugerido para esta etapa:** "Vamos a manejar formularios. Usa Utility Types (`Omit`, `Partial`) para definir los tipos necesarios para CREAR un producto (sin id) y EDITAR un empleado (campos opcionales). Luego crea una función mock `update` que acepte estos tipos parciales."
