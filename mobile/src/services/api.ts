import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.26.238.209:3333',
})