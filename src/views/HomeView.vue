<script setup>
import ArticlesList from '../components/ArticlesList.vue'
import SearchForm from '../components/SearchForm.vue'
import { ref } from 'vue'

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
