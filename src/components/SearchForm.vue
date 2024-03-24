<script setup>
import { reactive, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
const emit = defineEmits([ 'search-submit' ]);

const formState = reactive({
  query: '',  
})

const rules = computed(() => {
  return {
    query: {
      required,
      minLength: minLength(3),
    },
  }
})

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  const passed = await v$.value.$validate();
  if (!passed) return;
  const uri = encodeURI(`https://newsapi.org/v2/everything?pageSize=20&q="${formState.query}"`)

  const { data } = await useFetch(uri, {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        "X-Api-Key": NEWS_API_KEY,
      }
    }
  }).json()

  emit('search-submit' ,data.value.articles);
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="form">
    <v-text-field
      type="text"
      v-model="formState.query"
      minlength="3"
      required
      clearable
      variant="outlined"
    />
    <v-btn type="submit">Search</v-btn>
  </form>
</template>

<style scoped>
.form {
  margin: 1rem;
}
</style>
