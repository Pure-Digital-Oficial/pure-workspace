import axios from 'axios';

export const pureGeneralApi = axios.create({
  baseURL: process.env['NEXT_PUBLIC_SERVER_PURE_GENERAL_URL'],
  headers: {
    'Content-Type': 'application/json',
  },
});
