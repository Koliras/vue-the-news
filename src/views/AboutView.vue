<template>
  <div class="about">
    <h1 class="heading">About</h1>
    <p class="content">
      This is my pet project I made to practice in using Vue, Vue&nbsp;Router and Vuetify. For this purpose I used
      <a href="https://newsapi.org/">News API</a> to have some data to show. In order to use this project for
      yourself, you need to create .env.local file with variable VITE_NEWS_API_KEY which will contain your News API key. 
    </p>
  </div>
</template>

<style>
.heading {
  text-align: center;
}

.content {
  width: 35rem;
  max-width: 90vw;
  min-width: 22rem;
  text-align: center;
  font-size: 1.25rem;
}
</style>
