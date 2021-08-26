import { NextPage } from 'next';
import React from 'react';

const addTaskForm: NextPage = () => {
  return (
    <>
      <div className="background">
        {/* className="background" の欄は削除可能 */}
        <div className="modal-add-task">
          <form>
            <input className="input-name" type="text" value="タスク名" />
            <br />
            <input type="text" value="タスクの詳細" />
            <br />
            <input type="text" value="デッドライン" />
            <br />
            <button className="btn-submit">追加</button>
          </form>
        </div>
      </div>
      <style jsx>{`
        /* このブロックは削除可能 */
        .background {
          background-color: #ffc9ff;
          width: 100%;
          min-height: 100vh;
          position: fixed;
        }
        /* ここまで */

        .modal-add-task {
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
        .btn-submit {
          background-color: #83b369;
          opacity: 1;
          display: inline-block;

          width: 60px;
          height: 30px;
          margin-top: 5px;
          border: solid 1px #70995a;
          border-radius: 4px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);

          text-shadow: 0 1px rgba(0, 0, 0, 0.2);
          color: white;
        }
        .btn-submit:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  );
};

export default addTaskForm;
