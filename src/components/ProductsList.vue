<template>
  <ul class="catalog__list">
    <ProductsItems class="catalog__item"  v-for="product in products" :product="product"/>
  </ul>
</template>

<script setup>
  import ProductsItems from "@/components/ProductsItems.vue";
  const props = defineProps({
    products: Object
  })
</script>


