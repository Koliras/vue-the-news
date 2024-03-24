<script setup>
import ArticlesList from '../components/ArticlesList.vue'
import SearchForm from '../components/SearchForm.vue'
import { ref, onMounted } from 'vue'
import { useFetch } from '@vueuse/core'
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY

const news = ref([]);

function handleSubmit(newArticles) {
  news.value = newArticles;
}

onMounted(async () => {
  const { data, isFetching, error } = await useFetch('https://newsapi.org/v2/everything?pageSize=20&q=Apple', {
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
    <SearchForm @search-submit="handleSubmit" />
    <ArticlesList :articles='news' />
  </main>
</template>
