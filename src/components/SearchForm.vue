<script setup>
import { reactive, computed, ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { SEARCH_IN_FIELDS, initialNewsUrl, SORT_METHODS } from '../utils/constants.js'

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY
const emit = defineEmits([ 'search-submit' ]);

const showDateToPicker = ref(false);
const showDateFromPicker = ref(false);

const TODAY = (new Date()).toISOString().slice(0, 10);

const formState = reactive({
  query: '',
  searchIn: [],
  sortBy: 'publishedAt',
  dateTo: undefined,
  dateFrom: undefined,
})

const dateToFormated = computed(() => {
  if (!formState.dateTo) {
    return formState.dateTo;
  }
  const date = new Date(formState.dateTo);
  date.setDate(date.getDate() + 1);
  return date?.toISOString().slice(0, 10);
});

const dateFromFormated = computed(() => {
  if (!formState.dateFrom) {
    return formState.dateFrom;
  }
  const date = new Date(formState.dateFrom);
  date.setDate(date.getDate() + 1);
  return date?.toISOString().slice(0, 10);
});

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
    urlString += `&to=${dateToFormated.value}`
  }

  if (formState.dateFrom) {
    urlString += `&from=${dateFromFormated.value}`
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

function handleClear() {
  formState.query = '';
  formState.searchIn = [];
  formState.sortBy = 'publishedAt';
  formState.dateTo = undefined;
  formState.dateFrom = undefined;
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
    
    <div class="choices">
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

      <v-container class="sortContainer">
        <v-radio-group v-model="formState.sortBy">
          <h3>Sort by:</h3>
          <br>
          <v-radio
            v-for="sortMethod in SORT_METHODS"
            :label="sortMethod.label"
            :value="sortMethod.value"
          ></v-radio>
        </v-radio-group>
      </v-container>
    </div>

    <div class="dates">
      <div class="datePickerContainer">
        <button
          type="button"
          class="dateBtn"
          @click="showDateFromPicker = !showDateFromPicker"
        >
          From:
          <span>
            {{ dateFromFormated || "" }}
          </span>
        </button>

        <span
          v-if="showDateFromPicker"
          class="datePickerBack"
          @click="showDateFromPicker = false"
        ></span>

        <v-date-picker
          v-if="showDateFromPicker"
          class="datePicker"
          id="dateTo"
          @update:modelValue="() => showDateFromPicker = false"
          v-model="formState.dateFrom"
          :max="dateToFormated || TODAY"
          hide-header
        ></v-date-picker>
      </div>

      <div class="datePickerContainer">
        <button
          type="button"
          class="dateBtn"
          @click="showDateToPicker = !showDateToPicker"
        >
          To:
          <span>
            {{ dateToFormated || "" }}
          </span>
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
          :min="dateFromFormated"
          :max="TODAY"
          hide-header
        ></v-date-picker>
      </div>
    </div>

    <div class="buttons">
      <v-btn type="submit">Search</v-btn>
      <v-btn type="button" @click="handleClear">
        Clear
      </v-btn>
    </div>
  </form>
</template>

<style scoped>
.form {
  margin: 1rem;
}

.choices {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.searchInField {
  height: 2.25rem;
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
  width: fit-content;
  text-transform: capitalize;
}

.dates {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
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

.dateBtn {
  width: 11rem;
  background-color: #03a9f4;
  padding: 1rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  color: white;
  font-weight: 600;
}

.buttons {
  display: flex;
  gap: 1.5rem;
}
</style>
