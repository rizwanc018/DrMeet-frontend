// import axios from 'axios';

// export const AxiosBackend = axios.create({baseURL:'http://localhost:5000'})

// axios.interceptors.request.use((request) => {
//   request.withCredentials = true;
//   return request;
// });


// export default axios;

import axios from 'axios';

const AxiosBackend = axios.create({baseURL:'https://drmeet.online:5000'});

AxiosBackend.interceptors.request.use((request) => {
  request.withCredentials = true;
  return request;
});

export default AxiosBackend;

