<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'
import ArticlesList from '../components/ArticlesList.vue'
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

let news = ref([]);

onMounted(async () => {
  const { data, isFetching, error } = await useFetch('https://newsapi.org/v2/everything?q=Apple', {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        "X-Api-Key": NEWS_API_KEY,
      }
    }
  }).json()

  news.value = data.value.articles;
})
</script>

<template>
  <main>
    <h1>Home page</h1>
    <ArticlesList :articles='news' />
  </main>
</template>
