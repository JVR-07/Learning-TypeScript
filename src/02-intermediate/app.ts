import { ITask, TaskStatus } from "./types.js";
import { addTask, updateTaskStatus, isOverdue } from "./taskLogic.js";

const taskForm = document.getElementById("task-form") as HTMLFormElement;
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const taskDate = document.getElementById("task-date") as HTMLInputElement;
const taskListContainer = document.getElementById("task-list") as HTMLElement;
const taskCountSpan = document.getElementById("task-count") as HTMLElement;

let tasks: ITask[] = [];

const renderTasks = () => {
  taskListContainer.innerHTML = "";

  const sortedTasks = [...tasks].sort(
    (a, b) => a.limitDate.getTime() - b.limitDate.getTime()
  );

  if (sortedTasks.length === 0) {
    taskListContainer.innerHTML = `
      <div class="empty-state">
        <i class="ph ph-clipboard-text"></i>
        <p>No tienes tareas pendientes. ¡Agrega una arriba!</p>
      </div>
      `;
    taskCountSpan.innerText = "0 pendientes";
    return;
  }

  sortedTasks.forEach((task) => {
    const isTaskOverdue = isOverdue(task) && task.status !== "Terminada";
    const taskItem = document.createElement("article");

    taskItem.className = `task-item status-${task.status.replace(/\s+/g, "-")}`;

    taskItem.innerHTML = `
      <div class="task-info">
        <h4 class="task-title">${task.name}</h4>
        <div class="task-meta">
          <span class="task-status-badge">${task.status}</span>
          <span class="task-date ${isTaskOverdue ? "overdue" : ""}">
            <i class="ph ph-clock"></i> ${task.limitDate.toLocaleDateString()}
          </span>
        </div>
      </div>
      <div class="task-actions">
        <button class="action-btn check" onclick="window.toggleTaskStatus(${
          task.id
        })">
          <i class="ph ph-check-circle"></i>
        </button>
        <button class="action-btn delete" onclick="window.removeTask(${
          task.id
        })">
          <i class="ph ph-trash"></i>
        </button>
      </div>
    `;
    taskListContainer.appendChild(taskItem);
  });

  const pendingCount = tasks.filter((t) => t.status !== "Terminada").length;
  taskCountSpan.innerText = `${pendingCount} pendientes`;
};

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!taskInput.value.trim() || !taskDate.value) {
    alert("Por favor, completa el nombre y la fecha.");
    return;
  }

  tasks = addTask(tasks, {
    name: taskInput.value,
    description: "",
    createdAt: new Date(),
    limitDate: new Date(taskDate.value),
    status: "Sin iniciar",
  });

  taskForm.reset();
  renderTasks();
});

// Global functions
(window as any).toggleTaskStatus = (id: number) => {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    const nextStatus: TaskStatus =
      task.status === "Terminada" ? "Sin iniciar" : "Terminada";
    tasks = updateTaskStatus(tasks, id, nextStatus);
    renderTasks();
  }
};

(window as any).removeTask = (id: number) => {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
};

renderTasks();
