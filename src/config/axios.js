// import axios from 'axios';

// export const AxiosBackend = axios.create({baseURL:'http://localhost:5000'})

// axios.interceptors.request.use((request) => {
//   request.withCredentials = true;
//   return request;
// });


// export default axios;

import axios from 'axios';

// const AxiosBackend = axios.create({baseURL:'https://drmeet.online'});
const AxiosBackend = axios.create({baseURL:import.meta.env.VITE_BACKEND_URL});
// import.meta.env
AxiosBackend.interceptors.request.use((request) => {
  request.withCredentials = true;
  request.headers['jwt'] = localStorage.getItem('token')
  return request;
});

export default AxiosBackend;

