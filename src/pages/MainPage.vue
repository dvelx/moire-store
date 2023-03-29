<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ products.length }} товара
        </span>
      </div>
      <div>
        <label class="form__label form__label--select">
          <select class="form__select select-per-page" v-model.number="productsPerPage">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </label>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter v-model:priceFrom="filterPriceFrom"
                     v-model:priceTo="filterPriceTo"
                     v-model:categoryId="filterCategory"
                     v-model:color-id="filterColor"
                     v-model:seasons="filterSeasons"
                     v-model:material="filterMaterial"/>
      <section v-show="loading" class="catalog"><span class="loader"></span></section>
      <section class="catalog">
        <ProductsList :products="products"/>

        <BasePagination v-model:page="page" :count="countProducts" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>
<script setup>
  import BasePagination from "@/components/BasePagination.vue";
  import ProductFilter from "@/components/ProductFilter.vue";
  import ProductsList from "@/components/ProductsList.vue";
  import axios from "axios";
  import { API_BASE_URL } from "@/config";
  import {ref, computed, watch} from "vue";
  import {useRoute, useRouter} from "vue-router";

  const filterPriceFrom = ref(0)
  const filterPriceTo = ref(0)
  const filterCategory = ref(0)
  const filterColor = ref([])
  const filterSeasons = ref([])
  const filterMaterial = ref([])
  const route = useRoute()
  const router = useRouter()
  if (route.query.id) {
    filterCategory.value = route.query.id
  }


  const productsData = ref(null)
  const page = ref(1)
  const productsPerPage = ref(4)

  const loading = ref(true)


  const products = computed(() => {
    return productsData.value ? productsData.value.items.map(product => {
      return {
        ...product,
        image: product.colors[0].gallery !== null ? product.colors[0].gallery[0].file.url : 'img/placeholder.png'
      }
    }) : []
  })

  const countProducts = computed(() => {
    return productsData.value ? productsData.value.pagination.total : 0
  })

  const loadProducts = () => {
    productsData.value = null
    loading.value = true
      setTimeout(() => {
        axios.get(API_BASE_URL + "/products", {
          params: {
            page: page.value,
            limit: productsPerPage.value,
            materialIds: filterMaterial.value,
            categoryId: filterCategory.value,
            seasonIds: filterSeasons.value,
            minPrice: filterPriceFrom.value,
            maxPrice: filterPriceTo.value,
            colorIds: filterColor.value,
          }
        })
          .then(res => productsData.value = res.data)
          .then(() => {
            if (filterCategory.value === 0) {
              router.push('/')
            }
          })
          .then(() => loading.value = false)
      }, 1000)
  }
  watch([page,filterPriceFrom, filterPriceTo, filterCategory, filterColor, filterSeasons, filterMaterial, productsPerPage], () => {
    loadProducts()
  })
  loadProducts()



</script>

<style>
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #e02d71;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  margin: 30px auto;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.content__top {
  margin-bottom: 35px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.select-per-page {
  border: 1px solid #e02d71;
  width: 80px;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

