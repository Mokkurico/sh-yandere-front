import React from 'react';
import { TaskItemStruct } from '../params/_types';

type Props = {
  task: TaskItemStruct;
};

const TaskDetailModal: React.FC<Props> = ({ task }) => {
  return (
    <>
      {/* モーダルに載せたい要素各位 */}
      <input type="text" value={task.name} />
      <input type="text" value={task.description} />
      <button disabled={task.is_done === true}>{task.status !== 'remove' ? '編集' : '復元'}</button>
      <button>{task.status !== 'remove' ? '削除' : '抹消'}</button>
    </>
  );
};

export default TaskDetailModal;
