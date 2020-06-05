import axios from 'axios';

const baseConfig = {
  baseURL: 'http://152.136.185.210:8000/api/n3',
}
const instance = axios.create(baseConfig);

function sendRequest(options) {
  return instance(options);
}

export default sendRequest;
