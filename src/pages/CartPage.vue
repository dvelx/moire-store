<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'mainpage'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{ totalAmount }} товара
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div v-if="loadingCart" class="loader"></div>
          <ul v-else class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ priceFormat }} ₽</span>
          </p>

          <router-link v-if="products.length >= 1" tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
  import numberFormat from "@/helpers/numberFormat";
  import {useStore} from "vuex";
  import CartItem from "@/components/CartItem.vue";
  import {computed} from "vue";

  const store = useStore()
  //Приводим общую стоимость к читабельному виду
  const priceFormat = computed(() => {
    return numberFormat(totalPrice.value)
  })
  //вычисляем товары из корзины в store
  const products = (computed(() => {
    return store.getters['cartDetailProducts']
  }))
  //вычисляем общую стоимость товаров в корзине из store
  const totalPrice = computed(() => {
    return store.getters['cartTotalPrice']
  })
  // вычисляем общеее количество товаров в корзине из store
  const totalAmount = computed(() => {
    return store.getters['cartTotalAmount']
  })
  // прелоадер до получения всех товаров в корзине
  const loadingCart = computed(() => {
    return store.state.loadingCart
  })
    // загружаем корзину
  const loadCart = () => {
    return store.dispatch('loadCart')
  }
  loadCart()
</script>

<style>
    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #e02d71;
      border-bottom-color: transparent;
      border-radius: 50%;
      margin: 30px auto;
      display: flex;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
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

