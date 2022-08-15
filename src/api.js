import axios from 'axios';

export const apiClient = axios.create({
  header: {
    cache: 'no-cache',
    referrer: 'no-referrer',
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
  withCredentials: true,
  data: {},
  baseURL: process.env.REACT_APP_BASE_URL ?? 'http://localhost:3000',
  timeout: 1000 * 60 * 3, // 3분
});
