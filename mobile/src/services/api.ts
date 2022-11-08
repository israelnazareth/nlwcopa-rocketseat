import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://172.17.229.128:3333',
})