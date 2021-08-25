import { NextPage } from 'next';
import React from 'react';

const addTaskForm: NextPage = () => {
  return (
    <>
      <form>
        <input type="text" value="タスク名" />
        <input type="text" value="タスクの詳細" />
        <input type="text" value="デッドライン" />
        <button>追加</button>
      </form>
    </>
  );
};

export default addTaskForm;
