import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001' });

export const setLocalStorage = (email, name, role, token) => {
  api.defaults.headers.common.Authorization = { email, name, role, token };
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestRegisterSell = async (endpoint, body, header) => {
  const { data } = await api.post(endpoint, body, header);
  return data;
};

export const requestRegister = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;
