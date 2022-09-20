import axios from 'axios';

const baseURL = 'https://api.nexon.co.kr/fifaonline4/v1.0/';
const instance = axios.create({
  baseURL,
  headers: {
    Authorization: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default instance;
