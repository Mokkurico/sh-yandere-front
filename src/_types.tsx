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
  status: TaskStatusStruct;
};

export type PostTaskUpdateStruct = {
  task_id: string;
  name: string;
  desc: string;
  is_done: boolean;
  user_id: string;
  status: TaskStatusStruct;
};

export type PostTaskReadStruct = {
  user_id: string;
};

export type TaskStatusStruct = 'exist' | 'remove' | 'eliminated';
