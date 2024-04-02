<script setup>
const props = defineProps(['articles']);

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
  </ul>
  <h2 v-else>There are no articles</h2>
</template>

<style>
.articles_list {
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  gap: 0.5rem;
}

.article_card_container {
  width: 35rem;
  max-width: 90vw;
  min-width: 22rem;
  list-style: none;
}

</style>
