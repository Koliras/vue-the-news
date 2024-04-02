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
</script>

<template>
  <main>
    <SearchForm @search-submit="handleSubmit" />
    <ArticlesList :articles='news' />
  </main>
</template>
