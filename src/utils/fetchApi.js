import { useFetch } from '@vueuse/core'
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY

async function fetchApi(url) {
  return await useFetch(url, {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        "X-Api-Key": NEWS_API_KEY,
      }
    }
  }).json()
};

export default fetchApi;
