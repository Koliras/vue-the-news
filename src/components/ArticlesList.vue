<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps(['articles', 'amountOfPages']);
const $router = useRouter()
const $route = useRoute()

const currentPage = ref($route.query.page || 1);

watch(currentPage, () => {
  $router.push({ query: {
    ...$route.query,
    page: currentPage.value,
  }})
})

watch(() => $route.query.page, () => {
  currentPage.value = $route.query.page
});
</script>

<template>
  <ul class="articles_list" v-if="props.articles.length">
    <li
      v-for="article in props.articles"
      class="article_card_container"
      :key="article.url"
    >
      <v-card
        v-if="article.title !== '[Removed]'"
        :title="article.title"
        :text="article.description"
        :href="article.url"
        class="article_card"
        color="light-blue"
      ></v-card>
      <v-card
        v-else
        title="This article was removed"
        text="This article was removed, so there is nothing to show"
        class="article_card"
        color="pink"
        variant="tonal"
      ></v-card>
    </li>
    <v-pagination
      class="pagination"
      :length="props.amountOfPages"
      total-visible="6"
      v-model="currentPage"
    ></v-pagination>
  </ul>
  <h2 v-else>There are no articles</h2>
</template>

<style>
.articles_list {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
}

.article_card_container {
  width: 35rem;
  max-width: 90vw;
  min-width: 22rem;
  list-style: none;
}

.pagination {
  margin-bottom: 2rem;
}
</style>
