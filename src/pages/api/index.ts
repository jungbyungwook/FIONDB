import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.nexon.co.kr/fifaonline4/v1.0/',
  headers: {
    Authorization: process.env.NEXT_PUBLIC_API_KEY,
  },
});
