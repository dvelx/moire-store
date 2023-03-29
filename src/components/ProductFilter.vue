<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get" @submit.prevent="submit()">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors colors--black">
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="checkbox" name="color" :value="color.id" v-model="currentColorId">
              <span class="colors__value" :style="{backgroundColor: color.code}">
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>


      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="item of materials" :key="item.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material" :value="item.id" v-model="currentMaterials">
              <span class="check-list__desc">
                {{ item.title }}
                <span>({{ item.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="item in seasons" :key="item.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" :name="item.id" :value="item.id" v-model="currentSeasons">
              <span class="check-list__desc">
                {{ item.title }}
                <span>({{ item.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button v-show="   currentCategoryId !== 0
                      || currentColorId.length !== 0
                      || currentMaterials.length !== 0
                      || currentPriceFrom !== 0
                      || currentPriceTo !== 0
                      || currentSeasons.length !== 0"
        class="filter__reset button button--second" type="button" @click="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script setup>
  import axios from 'axios'
  import { API_BASE_URL } from '@/config'
  import {computed, ref, watch} from "vue";
  import {useRoute} from "vue-router";

  const route = useRoute()
  const props = defineProps([
    'priceFrom', 'priceTo', 'categoryId', 'colorId', 'seasons', 'material'
  ])
  const emits = defineEmits([
    'update:priceFrom', 'update:priceTo', 'update:categoryId', 'update:colorId', 'update:seasons', 'update:material'
  ])


  const currentPriceFrom = ref(0)
  const currentPriceTo = ref(0)
  const currentCategoryId = ref(0)
  const currentColorId = ref([])
  const currentSeasons = ref([])
  const currentMaterials = ref([])
  const categoriesData = ref(null)
  const colorsData = ref(null)
  const materialsData = ref(null)
  const seasonsData = ref(null)

  const categoryTestId = Number(route.query.id)

  if (categoryTestId) {
    currentCategoryId.value = categoryTestId
  }


  const categories = computed(() => {
    return categoriesData.value ? categoriesData.value.items : []
  })
  const colors = computed(() => {
    return colorsData.value ? colorsData.value.items : []
  })
  const materials = computed(() => {
    return materialsData.value ? materialsData.value.items : []
  })
  const seasons = computed(() => {
    return seasonsData.value ? seasonsData.value.items : []
  })

  const loadCategories = () => {
    axios.get(API_BASE_URL + '/productCategories')
      .then(response => categoriesData.value = response.data);
  }
  const loadColors = () => {
    axios.get(API_BASE_URL + '/colors')
      .then(response => colorsData.value = response.data)
  }
  const loadMaterials = () => {
    axios.get(API_BASE_URL + '/materials')
      .then(res => materialsData.value = res.data)
  }
  const loadSeasons = () => {
    axios.get(API_BASE_URL + '/seasons')
      .then(res => seasonsData.value = res.data)
  }
  const submit = () => {
    emits('update:priceFrom', currentPriceFrom.value)
    emits('update:priceTo', currentPriceTo.value)
    emits('update:categoryId', currentCategoryId.value)
    emits('update:colorId', currentColorId.value)
    emits('update:seasons', currentSeasons.value)
    emits('update:material', currentMaterials.value)
  }
  const reset = () => {
    emits('update:priceFrom', 0)
    emits('update:priceTo', 0)
    emits('update:categoryId', 0)
    emits('update:colorId', 0)
    emits('update:seasons', [])
    emits('update:material', [])
    currentSeasons.value = []
    currentMaterials.value = []
    currentCategoryId.value = 0
    currentColorId.value = []
    currentPriceFrom.value = 0
    currentPriceTo.value = 0
  }
  loadCategories()
  loadColors()
  loadMaterials()
  loadSeasons()

</script>
