import axios from 'axios';

const dartsApi = axios.create({
  baseURL: 'https://darts.sulla.hu/darts',
  headers: { 'Content-Type': 'application/json' },
});

export const getDarts = () => dartsApi.get('/');
export const getDart = (id) => dartsApi.get(`/${id}`);
export const createDart = (player) => dartsApi.post('/', player);
export const updateDart = (id, player) => dartsApi.put(`/${id}`, player);
export const deleteDart = (id) => dartsApi.delete(`/${id}`);

export const getRequestError = (error) => (
  error.response?.data?.message || error.message || 'A kérés nem sikerült. Próbáld újra.'
);