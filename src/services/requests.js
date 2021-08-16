const API_KEY = process.env.API_KEY;

export default {
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  popular: `/movie/popular?api_key=${API_KEY}&language=en-US`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
};
