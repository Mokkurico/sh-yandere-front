import { NextPage } from 'next';
import React from 'react';

const taskDetailForm: NextPage = () => {
  return (
    <>
      <form>
        <input type="text" value="タスク名" />
        <input type="text" value="タスクの詳細" />
        <input type="text" value="デッドライン" />
        <button>編集</button>
        <button>削除</button>
      </form>
    </>
  );
};

export default taskDetailForm;
