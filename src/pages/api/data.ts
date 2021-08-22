import axios from 'axios';
import { PostTaskReadStruct } from '../../_types';

export default (req, res) => {
  if (req.query.user_id) {
    // a slow endpoint for getting repo data
    const postData: PostTaskReadStruct = {
      user_id: req.query.user_id,
    };

    const requestOptions = {
      data: postData,
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    };

    axios
      .post('http://localhost:8080/task/read', requestOptions)
      .then((resp) => resp.data)
      .then((data) => {
        setTimeout(() => {
          res.json(data);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  } else if (req.query.task_id) {
    const requestOptions = {
      data: req.query,
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    };

    axios
      .post('http://localhost:8080/task/create', requestOptions)
      .then((resp) => resp.data)
      .then((data) => {
        setTimeout(() => {
          res.json(data);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setTimeout(() => {
    // res.json(projects)
    console.log('Timeout');
  }, 2000);
};
