import { ITask, TaskStatus } from "./types.js";

/**
 * Generate the next unique ID based in the current max value
 */
export function getNextId(taskList: ITask[]): number {
  if (taskList.length === 0) return 1;
  const ids = taskList.map((task) => task.id);
  return Math.max(...ids) + 1;
}

/**
 * Add a new task returning a new array
 * I use Omit for accept tasks without defined ID
 */
export function addTask(
  taskList: ITask[],
  newTaskData: Omit<ITask, "id">,
): ITask[] {
  const newTask: ITask = {
    id: getNextId(taskList),
    ...newTaskData,
  };

  return [...taskList, newTask];
}

/**
 * Update the state from specific task without mute the original array
 */
export function updateTaskStatus(
  taskList: ITask[],
  taskId: number,
  newStatus: TaskStatus,
): ITask[] {
  return taskList.map((task) => {
    if (task.id === taskId) {
      return { ...task, status: newStatus };
    }
    return task;
  });
}

/**
 * Check if a task has passed its deadline
 */
export function isOverdue(task: ITask): boolean {
  const now = new Date();
  return task.limitDate < now;
}
