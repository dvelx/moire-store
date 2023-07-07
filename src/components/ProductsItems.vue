<template>
  <li v-bind="$attrs" class="catalog__item" :key="product.id" >
    <router-link class="catalog__pic" :to="{name: 'productpage', params: {id: product.id}}">
      <img :src="product.image || require" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#" @click.prevent="openQuickView(product.id)">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>


    <ul class="colors colors--black">
      <li class="colors__item" v-for="property in product.colors" :key="property.color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-02" :value="property.color.code">
          <span class="colors__value" :style="{backgroundColor: property.color.code}">
          </span>
        </label>
      </li>

    </ul>
  </li>

  <BaseModal v-model:open="isQuickViewOpen">
    <ProductQuickView :product-id="currentId" />
  </BaseModal>
</template>
<script>
  export default {
    inheritAttrs: false
  }
</script>
<script setup>
  import BaseModal from "@/components/BaseModal.vue";
  import numberFormat from "@/helpers/numberFormat";
  import {computed, defineAsyncComponent, h, ref} from "vue";

  // Асинхронный компонент для вызова модального кона с кратким описанием определенного товара
  const ProductQuickView = defineAsyncComponent({
    loader: () => import('@/components/ProductQuickView.vue'),
    delay: 0,
    loadingComponent: () => h('div', 'Загрузка...')
  })

  const currentId = ref(null)
  const props = defineProps({
    product: Object
  })
  //Проверка, открыто ли модальное окно, и если да то закрываем, если нет, соответственно открываем
  const isQuickViewOpen = computed({
    get() {
      return !!currentId.value
    },
    set(isOpen) {
      if (!isOpen) {
        currentId.value = null
      }
    }
  })
  // не используется, метод для приведения стоимости товара к красивому виду ( 10000 => 10 000 )
  const priceNormalize = computed(() => {
    return props.product.map((product) => {
      return {
        ...product,
        pricePretty: numberFormat(product.price)
      }
    })
  })
    // открытие модального окна выбранного товара по его ID
  const openQuickView = (productId) => {
    currentId.value = productId
    isQuickViewOpen.value = true
  }
</script>

