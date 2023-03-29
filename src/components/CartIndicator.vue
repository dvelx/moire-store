<template>
  <router-link :to="{name: 'cart'}" class="header__cart" href="cart.html" aria-label="Корзина с товарами">
    <svg width="19" height="24">
      <use xlink:href="img/svg/sprite.svg#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ productsAmount }}</span>
  </router-link>
</template>

<script setup>
  import {useStore} from "vuex";
  import {computed} from "vue";

  const store = useStore()
  const productsAmount = computed(() => {
    return store.state.cartProductsData.length || 0
  })
</script>

