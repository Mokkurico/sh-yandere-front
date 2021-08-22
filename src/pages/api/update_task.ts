import axios from 'axios';

export default (req, res) => {
  if (req.query.task_id) {
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
