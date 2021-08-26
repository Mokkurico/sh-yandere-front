import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import axios from 'axios';
import {
  mapStatusCodeToStatus,
  PostTaskReadStruct,
  TaskFilterStruct,
  TaskItemStruct,
} from '../params/_types';
import { tmpUserId } from '../params/_constParams';
import Modal from 'react-modal';
import AddButton from '../components/AddButton';

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
        setTasks(
          response.data.map((item) => {
            console.log(item);
            item.status = mapStatusCodeToStatus(item.status);
            return item;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="background">
        <style jsx>{`
          .background {
            background-color: #ffc9ff;
            width: 100%;
            min-height: 100vh;
            position: fixed;
          }
        `}</style>

        <button onClick={() => onTaskRead(tmpUserId)}>取得</button>
        {/**
         * 単純なconsole.logの文字列渡しまでは動作を確認できたが、
         * HTMLが返せない？っぽいので、モーダルに乗せる予定の
         * ボタン試しおきができていない。
         */}
        <AddButton onClick={openModal} />

        {/* 見た目チェック用 */}
        <a href="/addTaskForm">追加モーダル</a>

        {/* 見た目チェック用 */}
        <a href="/taskDetailForm">詳細モーダル</a>

        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
        />
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
