<script setup>
import { reactive, computed, ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { SEARCH_IN_FIELDS, initialNewsUrl, SORT_METHODS } from '../utils/constants.js'

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
const emit = defineEmits([ 'search-submit' ]);
const showDateToPicker = ref(false);

const formState = reactive({
  query: '',
  searchIn: [],
  sortBy: 'publishedAt',
  dateTo: undefined,
  dateFrom: undefined,
})

const dateToBtn = ref(null)
const dateToFormated = computed(() => formState.dateTo?.toISOString().slice(0, 10));
const dateFromFormated = computed(() => formState.dateFrom?.toISOString().slice(0, 10));

const rules = computed(() => {
  return {
    query: {
      required,
      minLength: minLength(3),
    },
    searchIn: {},
    sortBy: {},
    dateTo: {},
    dateFrom: {},
  }
})

const v$ = useVuelidate(rules, formState);

async function handleSubmit() {
  const passed = await v$.value.$validate();
  if (!passed) return;

  let urlString = initialNewsUrl + `&q=${formState.query}&sortBy=${formState.sortBy}`;
  if (formState.searchIn.length) {
    urlString += `&searchIn=${formState.searchIn.join(',')}`
  }

  if (formState.dateTo) {
    urlString += `&to${formState.dateTo}`
  }
  const uriEncodedString = encodeURI(urlString);

  const { data } = await useFetch(uriEncodedString, {
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
    ></v-text-field>
    
    <div class="searchInContainer">
      <h3>Search in: <sup class="sup">by default searches everywhere</sup></h3>
      <v-checkbox
        v-for="field in SEARCH_IN_FIELDS"
        :label="field"
        :value="field"
        v-model="formState.searchIn"
        class="searchInField"
        hide-details
        type="checkbox"
      ></v-checkbox>
    </div>

    <v-container fluid class="sortContainer">
      <v-radio-group v-model="formState.sortBy">
        <h3>Sort by:</h3>
        <v-radio
          v-for="sortMethod in SORT_METHODS"
          :label="sortMethod.label"
          :value="sortMethod.value"
        ></v-radio>
      </v-radio-group>
    </v-container>

    <div class="datePickerContainer">
      <button
        type="button"
        @click="showDateToPicker = !showDateToPicker"
        ref="dateToBtn"
      >
        To: {{ dateToFormated || "" }}
      </button>

      <span
        v-if="showDateToPicker"
        class="datePickerBack"
        @click="showDateToPicker = false"
      ></span>

      <v-date-picker
        v-if="showDateToPicker"
        class="datePicker"
        id="dateTo"
        @update:modelValue="() => showDateToPicker = false"
        v-model="formState.dateTo"
        hide-header
      ></v-date-picker>
    </div>

    <v-btn type="submit">Search</v-btn>
  </form>
</template>

<style scoped>
.form {
  margin: 1rem;
}

.searchInField {
  height: 2rem;
}

.searchInContainer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
  text-transform: capitalize;
}

.sup {
  text-transform: none;
  color: gray;
  font-weight: 400;
  font-size: 0.75rem;
}

.sortContainer {
  padding: 0;
  margin-top: 2rem;
}

.datePickerContainer {
  position: relative;
}

.datePicker {
  position: absolute;
  z-index: 2;
}

.datePickerBack {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}
</style>
