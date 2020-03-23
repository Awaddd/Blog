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