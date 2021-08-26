import { NextPage } from 'next';
import React from 'react';

const taskDetailForm: NextPage = () => {
  return (
    <>
      <div className="background">
        <div className="modal-task-detail">
          <form>
            <input className="input-name" type="text" value="タスク名" />
            <br />
            <input type="text" value="タスクの詳細" />
            <br />
            <input type="text" value="デッドライン" />
            <br />
            <button className="btn-edit">編集</button>
            <button className="btn-remove">削除</button>
          </form>
        </div>
      </div>
      <style jsx>{`
        /* .background は削除可能 */
        .background {
          background-color: #ffc9ff;
          width: 100%;
          min-height: 100vh;
          position: fixed;
        }
        .modal-task-detail {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          width: 400px;
          height: 300px;
          text-align: center;
          background-color: white;
        }
        input {
          width: 250px;
          margin-bottom: 15px;
        }
        .input-name {
          margin-top: 60px;
        }
        .btn-edit {
          background-color: white;
          opacity: 1;
          display: inline-block;

          width: 60px;
          height: 30px;
          margin-top: 5px;
          margin-right: 75px;
          border: solid 1px black;
          border-radius: 4px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);

          text-shadow: 0 1px rgba(0, 0, 0, 0.2);
          color: black;
        }
        .btn-edit:hover {
          opacity: 0.7;
        }
        .btn-remove {
          background-color: #cf222e;
          opacity: 1;
          display: inline-block;

          width: 60px;
          height: 30px;
          margin-top: 5px;
          margin-left: 75px;

          border: solid 1px #b51d27;
          border-radius: 4px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);

          text-shadow: 0 1px rgba(0, 0, 0, 0.2);
          color: white;
        }
        .btn-remove:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
};

export default taskDetailForm;
