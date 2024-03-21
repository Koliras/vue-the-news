<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

let news = ref([]);

onMounted(async () => {
  const { data, isFetching, error } = await useFetch('https://newsapi.org/v2/everything?q=Apple', {
    async beforeFetch({ options }) {
      options.headers["X-Api-Key"] = NEWS_API_KEY;
      options.headers["Authorization"] = NEWS_API_KEY;

      return {
        options,
      }
    }
  }).json()

  news.value = data.value.articles;
})
</script>

<template>
    <main>
        <h1>Home page</h1>
        <ul>
          <h2>{{ news.length }}</h2>
          <li v-for="article in news">
            {{ article.title }}
          </li>
        </ul>
    </main>
</template>
