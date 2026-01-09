export type TaskStatus = "Sin iniciar" | "En proceso" | "Terminada";

export interface ITask {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  limitDate: Date;
  status: TaskStatus;
}
