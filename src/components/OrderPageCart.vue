<template>

  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ prettyPrice }} ₽</b>
    <span>Артикул: {{ item.product.id }}</span>
  </li>

</template>

<script>
  import numberFormat from "@/helpers/numberFormat";
  import {computed} from "vue";

  export default {
    props: ['item'],
    setup(props) {
      const prettyPrice = computed(() => {
        return numberFormat((props.item.product.price * props.item.amount))
      })

      return {prettyPrice}
    }
  }
</script>
