import { ITask } from "./types.js";
import { addTask, updateTaskStatus, isOverdue } from "./taskLogic.js";

let tasks: ITask[] = [];

// Example: Add new task
tasks = addTask(tasks, {
  name: "Aprender interfaces en TS",
  description: "Estudiar la diferencia entre tipado estructural y nominal",
  createdAt: new Date(),
  limitDate: new Date("2026-01-15"),
  status: "Sin iniciar",
});

// Example: Add other task
tasks = addTask(tasks, {
  name: "Configurar entorno",
  description: "Instalar dependencias y configurar tsconfig.json",
  createdAt: new Date(),
  limitDate: new Date("2026-01-01"), // Old date for check overdue status
  status: "En proceso",
});

// --- Console Test ---
console.log("Lista de Tareas:", tasks);

// Check if the second task (ID 2) is expired
const task2 = tasks.find((t) => t.id === 2);
if (task2) {
  console.log(
    `¿La tarea "${task2.name}" está caducada?:`,
    isOverdue(task2) ? "Sí" : "No"
  );
}

// Complete task 1
tasks = updateTaskStatus(tasks, 1, "Terminada");
console.log("Tareas después de actualizar:", tasks);
