import React from 'react';
import { TaskItemStruct, TaskStatusStruct } from '../params/_types';
import TaskDetailModal from './TaskDetailModal';
import ButtonCallCompo from './ButtonCallCompo';

type Props = {
  task: TaskItemStruct;
  onTaskFinish: (id: string, is_done: boolean) => void;
  onTaskRename: (id: string, name: string) => void;
  onTaskRemove: (id: string, status: TaskStatusStruct) => void;
  onTaskRemovePerm: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({
  task,
  onTaskFinish,
  onTaskRename,
  onTaskRemove,
  onTaskRemovePerm,
}) => {
  return (
    <>
      {/* これをクリックすると、詳細モーダル表示 */}
      {/**
       * 下のボタンコンポーネントにて、他のコンポーネントを呼び出す
       * …としたいのだが、
       * React.FCの使用上、下の呼び出し方はできない模様。
       * 何かしらの方法を用いて、コンポーネント、
       * 及びコンポーネントに変わるデーター群を渡したい。
       */}
      <ButtonCallCompo compo={TaskDetailModal({ task: task })} text="詳細" />

      <input
        type="checkbox"
        checked={task.is_done}
        disabled={task.status === 'remove'}
        onChange={() => onTaskFinish(task.id, task.is_done)}
      />
      <input
        type="text"
        value={task.name}
        disabled={task.is_done || task.status === 'remove'}
        onChange={(e) => onTaskRename(task.id, e.target.value)}
      />
      <button onClick={() => onTaskRemove(task.id, task.status)}>
        {task.status === 'remove' ? '復元' : '削除'}
      </button>
      <button hidden={task.status === 'remove'} onClick={() => onTaskRemovePerm(task.id)}>
        抹消
      </button>
    </>
  );
};

export default TaskItem;
