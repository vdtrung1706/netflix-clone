import { default as defaultAxios } from 'axios';

export const API_KEY = process.env.API_KEY;
export const IMAGE_BASE = process.env.IMAGE_BASE;
export const API_BASE = process.env.API_BASE;

export const axios = defaultAxios.create({
  baseURL: API_BASE,
});
