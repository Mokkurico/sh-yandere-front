import axios from 'axios';
import { mapStatusCodeToStatus, PostTaskReadStruct } from '../../_types';

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
          // console.log(data);
          console.log('Called');
          res.json(
            data.map((item) => {
              console.log(item);
              item.status = mapStatusCodeToStatus(item.status);
              return item;
            })
          );

          res.end();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  }
  setTimeout(() => {
    // res.json(projects)
    console.log('Timeout');
  }, 2000);
};
