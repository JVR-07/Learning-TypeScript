import { useState } from "react";
import {
  Plus,
  Trash,
  CheckCircle,
  Clock,
  CalendarPlus,
  ClipboardText,
  WarningCircle,
} from "@phosphor-icons/react";
import { ProjectNavbar } from "../../ProjectNavbar";
import { ITask } from "./types";
import { addTask, updateTaskStatus, isOverdue } from "./taskLogic";
import "./TaskManager.css";

export const TaskManager = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [error, setError] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName.trim() || !taskDate) {
      setError(true);
      return;
    }

    const newTaskList = addTask(tasks, {
      name: taskName,
      description: "",
      createdAt: new Date(),
      limitDate: new Date(taskDate),
      status: "Sin iniciar",
    });

    setTasks(newTaskList);

    setTaskName("");
    setTaskDate("");
    setError(false);
  };

  const handleToggleStatus = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const nextStatus =
      task.status === "Terminada" ? "Sin iniciar" : "Terminada";
    const updatedTasks = updateTaskStatus(tasks, id, nextStatus);
    setTasks(updatedTasks);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.limitDate).getTime() - new Date(b.limitDate).getTime(),
  );

  const pendingCount = tasks.filter((t) => t.status !== "Terminada").length;

  return (
    <div className="layout-container">
      <ProjectNavbar
        moduleTitle="Módulo 02"
        badgeText="Intermedio"
        badgeColor="medium"
        prevLink="/project-1"
      />

      <div className="project-container">
        <section className="input-section">
          <div className="card task-input-card">
            <h2>Nueva Tarea</h2>
            <form onSubmit={handleAddTask} className="task-form">
              <div className="input-group-row">
                <input
                  type="text"
                  id="task-input"
                  placeholder="Ej: Terminar la documentación..."
                  autoComplete="off"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />

                <div className="date-wrapper" id="date-container">
                  <input
                    type="date"
                    id="task-date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                  />
                  <button type="button" className="icon-btn date-trigger">
                    <CalendarPlus size={20} />
                    <span className="date-text">
                      {taskDate
                        ? new Date(taskDate).toLocaleDateString()
                        : "Fecha"}
                    </span>
                  </button>
                </div>

                <button type="submit" className="create-btn">
                  <Plus size={20} weight="bold" />
                  <span className="btn-text">Crear</span>
                </button>
              </div>

              {error && (
                <div className="form-error">
                  <WarningCircle size={20} />
                  <span>Por favor, completa el nombre y la fecha</span>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="feed-section">
          <header className="feed-header">
            <h3>Mis Tareas</h3>
            <span className="task-count">{pendingCount} pendientes</span>
          </header>

          <div className="task-list">
            {sortedTasks.length === 0 ? (
              <div className="empty-state">
                <ClipboardText size={48} />
                <p>No tienes tareas pendientes. ¡Agrega una arriba!</p>
              </div>
            ) : (
              sortedTasks.map((task) => {
                const isTaskOverdue =
                  isOverdue(task) && task.status !== "Terminada";
                const statusClass =
                  task.status === "Terminada"
                    ? "status-done"
                    : task.status === "En proceso"
                      ? "status-process"
                      : "status-todo";

                return (
                  <article key={task.id} className={`task-item ${statusClass}`}>
                    <div className="task-info">
                      <h4 className="task-title">{task.name}</h4>
                      <div className="task-meta">
                        <span className="task-status-badge">{task.status}</span>
                        <span
                          className={`task-date ${isTaskOverdue ? "overdue" : ""}`}
                        >
                          <Clock size={16} style={{ marginRight: 4 }} />
                          {new Date(task.limitDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="task-actions">
                      <button
                        className="action-btn check"
                        onClick={() => handleToggleStatus(task.id)}
                        title={
                          task.status === "Terminada" ? "Reabrir" : "Completar"
                        }
                      >
                        <CheckCircle
                          size={24}
                          weight={
                            task.status === "Terminada" ? "fill" : "regular"
                          }
                        />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(task.id)}
                        title="Eliminar"
                      >
                        <Trash size={24} />
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
