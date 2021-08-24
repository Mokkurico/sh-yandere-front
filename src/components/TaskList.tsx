import {
  mapStatusToCode,
  PostTaskUpdateStruct,
  TaskFilterStruct,
  TaskItemStruct,
  TaskStatusStruct,
} from '../_types';
import TaskItem from './TaskItem';
import TaskAdder from './TaskAdder';
import { tmpUserId } from '../_constParams';
import axios from 'axios';
import { useState } from 'react';
import useRequest from '../libs/request';

type Props = {
  tasks: TaskItemStruct[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItemStruct[]>>;
  taskFilter: TaskFilterStruct;
  setTaskFilter: React.Dispatch<React.SetStateAction<TaskFilterStruct>>;
};

const TaskList: React.FC<Props> = ({ tasks, setTasks, taskFilter, setTaskFilter }) => {
  const [postResult, setPostResult] = useState();
  const user_id = 'example-user-id';
  const { data } = useRequest<TaskItemStruct[]>({
    url: '/api/data',
    params: { user_id },
  });

  const FilteredTasks = data
    ? data.filter((task) => {
        switch (taskFilter) {
          case 'unfinished':
            return !task.is_done && task.status === 'exist';
          case 'finished':
            return task.is_done && task.status === 'exist';
          case 'all':
            return task.status === 'exist';
          case 'removed':
            return task.status === 'remove';
        }
      })
    : [];

  const onTaskFinish = (task_id: string, is_finished: boolean) => {
    const newTask = data.map((task) => {
      console.log(task.task_id);
      if (task.task_id === task_id) {
        console.log(task);

        const postData: PostTaskUpdateStruct = {
          task_id: task.task_id,
          name: task.name,
          desc: task.desc,
          is_done: !is_finished,
          user_id: tmpUserId,
          status: mapStatusToCode('exist'),
        };

        AxiosUpdateTask(postData);
        if (postResult === false) return;

        task.is_done = !is_finished;
      }
      return task;
    });

    setTasks(newTask);
  };

  const onTaskRename = (task_id: string, name: string) => {
    const newTask = data.map((task) => {
      if (task.task_id === task_id) {
        const postData: PostTaskUpdateStruct = {
          task_id: task.task_id,
          name: name,
          desc: task.desc,
          is_done: task.is_done,
          user_id: tmpUserId,
          status: mapStatusToCode('exist'),
        };

        AxiosUpdateTask(postData);
        if (postResult === false) return;
        task.name = name;
      }
      return task;
    });

    setTasks(newTask);
  };

  const onTaskRemove = (task_id: string, status: TaskStatusStruct) => {
    const newTask = data.map((task) => {
      if (task.task_id === task_id) {
        status = 'remove';
        // else status = 'exist';

        const postData: PostTaskUpdateStruct = {
          task_id: task.task_id,
          name: task.name,
          desc: task.desc,
          is_done: task.is_done,
          user_id: tmpUserId,
          status: mapStatusToCode(status),
        };

        AxiosUpdateTask(postData);
        if (postResult === false) return;

        task.status = status;
      }
      return task;
    });
    console.log(newTask.filter((task) => task.status !== 'remove'));
    setTasks(newTask.filter((task) => task.status !== 'remove'));
  };

  const onTaskRemovePerm = (task_id: string) => {
    data.map((task) => {
      if (task.task_id === task_id) {
        const postData: PostTaskUpdateStruct = {
          task_id: task.task_id,
          name: task.name,
          desc: task.desc,
          is_done: task.is_done,
          user_id: tmpUserId,
          status: mapStatusToCode('eliminated'),
        };

        AxiosUpdateTask(postData);
        if (postResult === false) return;
      }
    });
    const newTasks = data.filter((task) => task.task_id !== task_id);
    setTasks(newTasks);
  };

  const onTaskRemovePermAll = () => {
    data.map((task) => {
      if (task.status === 'remove') {
        const postData: PostTaskUpdateStruct = {
          task_id: task.task_id,
          name: task.name,
          desc: task.desc,
          is_done: task.is_done,
          user_id: tmpUserId,
          status: mapStatusToCode('eliminated'),
        };
        console.log(postData);
        AxiosUpdateTask(postData);
        if (postResult === false) return;
      }
    });
    const newTasks = data.filter((task) => task.status === 'exist');
    setTasks(newTasks);
  };

  const AxiosUpdateTask = (postData: PostTaskUpdateStruct) => {
    let result: boolean;

    const requestOptions = {
      data: postData,
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    };

    axios
      .post('http://localhost:8080/task/create', postData)
      .then((response) => {
        console.log(response.data.result);
        setPostResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  };

  return (
    <>
      <select
        defaultValue="unfinished"
        onChange={(e) => setTaskFilter(e.target.value as TaskFilterStruct)}
      >
        <option value="unfinished">未処理</option>
        <option value="finished">処理済み</option>
        <option value="all">全表示</option>
        <option value="removed">削除済み</option>
      </select>
      {taskFilter === 'removed' ? (
        <button onClick={() => onTaskRemovePermAll()}>全て抹消</button>
      ) : (
        <TaskAdder tasks={data} setTasks={setTasks} />
      )}
      <ul style={{ listStyle: 'none' }}>
        {data
          ? data
              .filter((task) => task.status === 'exist')
              .map((task) => {
                return (
                  <li key={task.task_id}>
                    <TaskItem
                      task={task}
                      onTaskFinish={onTaskFinish}
                      onTaskRename={onTaskRename}
                      onTaskRemove={onTaskRemove}
                      onTaskRemovePerm={onTaskRemovePerm}
                    />
                  </li>
                );
              })
          : 'loading...'}
      </ul>
    </>
  );
};

export default TaskList;
