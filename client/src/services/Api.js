import axios from "axios";

export default () => {
  const url = `https://dinisoasis.herokuapp.com/api/`;
  // const url = `http://localhost:3000/api/`;
  return axios.create({
    baseURL: url
  });
};
