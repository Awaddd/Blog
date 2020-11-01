import axios from "axios";
import { authHeader } from '@/helpers/helpers';

export default () => {
  const url = `https://www.blogapi.site/api/`;
  // const url = `http://localhost:3000/api/`;
  localStorage.setItem('url', url);
  return axios.create({
    headers: authHeader(),
    baseURL: url
  });
};