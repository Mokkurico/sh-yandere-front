export type TaskItemStruct = {
  task_id: string;
  name: string;
  desc: string;
  is_done: boolean;
  status: TaskStatusStruct;
};

export type TaskFilterStruct = 'unfinished' | 'finished' | 'all' | 'removed';

export type PostTaskCreateStruct = {
  name: string;
  desc: string;
  is_done: boolean;
  user_id: string;
  status: number;
};

export type PostTaskUpdateStruct = {
  task_id: string;
  name: string;
  desc: string;
  is_done: boolean;
  user_id: string;
  status: number;
};

export type PostTaskReadStruct = {
  user_id: string;
};

export type TaskStatusStruct = 'exist' | 'remove' | 'eliminated';

export const mapStatusToCode = (status: TaskStatusStruct): number => {
  if (status === 'exist') return 0;
  else if (status === 'remove') return 1;
  else return 2;
};

export const mapStatusCodeToStatus = (code: number): TaskStatusStruct => {
  if (code === 0) return 'exist';
  else if (code === 1) return 'remove';
  else return 'eliminated';
};
