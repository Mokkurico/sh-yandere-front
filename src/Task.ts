export interface Task {
  task_id: string;
  name: string;
  description: string;
  is_done: boolean;
  user_id: string;
  task_status: number;
  deadline: string;
}
