import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import axios from 'axios';
import { PostTaskReadStruct, TaskFilterStruct, TaskItemStruct } from '../_types';
import { styleSceneTodoApp } from '../_styles';
import { tmpUserId } from '../_constParams';
import Modal from 'react-modal';

// スタイリング
const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '500px',
    height: '300px',
    transform: 'translate(-50%, -50%)',
  },
};
const App: NextPage = () => {
  const styles = styleSceneTodoApp();

  const [taskDataReaded, setTaskDataReaded] = useState([]);
  const [tasks, setTasks] = useState<TaskItemStruct[]>([]);
  const [taskFilter, setTaskFilter] = useState<TaskFilterStruct>('unfinished');

  const onTaskRead = (userId: string) => {
    const postData: PostTaskReadStruct = {
      user_id: userId,
    };

    const requestOptions = {
      data: postData,
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    };

    axios
      .post('http://localhost:8080/task/read', requestOptions)
      .then((response) => {
        setTaskDataReaded(response.data);
        console.log(taskDataReaded);
        setTaskList();
      })
      .catch((error) => {
        console.log(error);
      });

    const setTaskList = () => {
      //const filtered = taskDataReaded.filter((data) => data.status !== 'eliminated');
      taskDataReaded.map((elem) => {
        if (elem.status !== 'eliminated') {
          const newTask: TaskItemStruct = {
            id: elem.task_id,
            name: elem.name,
            description: elem.description,
            is_done: elem.is_done,
            status: elem.status,
          };
          console.log(newTask);
          setTasks([newTask, ...tasks]);
        }
      });
    };
  };

  // アプリのルートを識別するクエリセレクタを指定する。
  Modal.setAppElement('#__next');

  const [modalIsOpen, setIsOpen] = useState(false);

  // モーダルを開く処理
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // モーダルが開いた後の処理
  };

  // モーダルを閉じる処理
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Head>
        <title>Todo with Yandere chan!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <div className={styles.Background}>
        <button onClick={() => onTaskRead(tmpUserId)}>取得</button>
        {/*
          <Grid justifyContent="flex-start" alignContent="flex-start" direction="column">
            <Tooltip title="Add" aria-label="add">
              <Fab>
                <Add />
              </Fab>
            </Tooltip>
          </Grid>
          <Grid justifyContent="center" alignContent="center">
          */}
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
        />
        {/*</Grid>*/}
      </div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        // isOpenがtrueならモダールが起動する
        isOpen={modalIsOpen}
        // モーダルが開いた後の処理を定義
        onAfterOpen={afterOpenModal}
        // モーダルを閉じる処理を定義
        onRequestClose={closeModal}
        // スタイリングを定義
        style={customStyles}
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
      </Modal>
    </>
  );
};

export default App;
