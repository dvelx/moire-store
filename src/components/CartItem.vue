<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.image" width="120" height="120"  :alt="item.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <p class="product__info" style="paddingBottom: 45px">
      Размер:
      <span>
        {{ item.size.title }}
      </span>
    </p>
    <p class="product__info product__info--color">
      Цвет:
      <span v-for="color in item.color">
        <i :style="{backgroundColor: color.code}"></i>
        {{ color.title }}
      </span>
    </p>

    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <BaseCounter v-model:amount.number="amount"/>

    <b class="product__price">
      {{totalItemPrice}} ₽
    </b>

    <button class="product__del button-del" style="cursor: pointer" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProductFromCart(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="img/svg/sprite.svg#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script setup>
  import numberFormat from "@/helpers/numberFormat";
  import {useStore} from "vuex";
  import BaseCounter from "@/components/BaseCounter.vue";
  import {computed, toRefs} from "vue";

  const store = useStore()

  const props = defineProps({
    item: Object
  })
  const { item } = toRefs(props)

  // Вычисляем Общую стоимость
  const totalItemPrice = computed(() => {
    return numberFormat(item.value.product.price * item.value.amount)
  })
  const amount = computed({
    get() {
      return item.value.amount
    },
    set(value) {
      store.dispatch('updateCartProductAmount', {productId: item.value.productId, amount: value})
    }
  })
    // метод удаления товара из корзины
  const deleteProductFromCart = (productId) => {
    return store.dispatch('deleteProductToCart', productId)
  }
</script>


