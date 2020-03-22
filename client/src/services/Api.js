import axios from "axios";
import { authHeader } from '@/helpers/helpers';

export default () => {
  // const url = `https://dinisoasis.herokuapp.com/api/`;
  const url = `http://localhost:3000/api/`;
  localStorage.setItem('url', url);
  return axios.create({
    headers: authHeader(),
    baseURL: url
  });
};

headers: authHeader()


// export default () => {
//   // const url = `https://dinisoasis.herokuapp.com/api/`;
//   const url = `http://localhost:3000/api/`;
//   localStorage.setItem('url', url);
//   return axios.create({
//     headers: {
//       // 'Accept-Language': 'en-US,en;q=0.8',
//       // 'Content-Type': 'image/*'
//       'Content-Type': 'application/json'
//       // 'Accept-Language': 'en-US,en;q=0.8',
//       // 'Content-Type': 'multipart/form-data'
      
//     },
//     baseURL: url
//   });
// };