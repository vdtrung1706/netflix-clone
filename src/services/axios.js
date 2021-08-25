import axios from 'axios';

export const API_KEY = process.env.API_KEY;
export const IMAGE_BASE = process.env.IMAGE_BASE;

export default axios.create({
  baseURL: process.env.API_BASE,
});
