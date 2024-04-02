<script setup>
import ArticlesList from '../components/ArticlesList.vue'
import SearchForm from '../components/SearchForm.vue'
import { ref } from 'vue'

const news = ref([]);
const amountOfPages = ref(0)

function handleSubmit(newData) {
  news.value = newData.articles;
  amountOfPages.value = Math.ceil(newData.totalResults / 20);
}
</script>

<template>
  <main>
    <SearchForm @search-submit="handleSubmit" />
    <ArticlesList :articles='news' :amountOfPages="amountOfPages" />
  </main>
</template>
