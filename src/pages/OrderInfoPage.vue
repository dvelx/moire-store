<template>
  <div v-if="store.state.loadingCart" class="container content">
    <div class="loader"></div>
  </div>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'mainpage'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                 {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                l{{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Комментарий:
              </span>
              <span class="dictionary__value">
                {{ orderInfo.comment }}
              </span>
            </li>

            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ orderInfo.paymentType }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item of orderProduct">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ orderInfo.deliveryType.price }}</b></p>
            <p>Итого: <b>{{ orderProduct.length }}</b> товара на сумму <b>{{ totalPricePretty }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>

  import {useStore} from "vuex";
  import {computed} from "vue";
  import {useRoute} from "vue-router";
  import numberFormat from "@/helpers/numberFormat";

  const store = useStore()
  const route = useRoute()
  //Вычисляем и получаем информация о заказе
  const orderInfo = computed(() => {
    return store.state.orderInfo
  })
  //Вычисляем и приводим общую стоимость к читабельному виду
  const totalPricePretty = computed(() => {
    return numberFormat(store.state.orderInfo.totalPrice)
  })
  // вычисляем товары хранящиеся в корзине
  const orderProduct = computed(() => {
      return store.state.orderInfo.basket.items
  })

  const created = () => {
    if (store.state.orderInfo && store.state.orderInfo.id === route.params.id) {
      return
    }
    store.dispatch('loadOrderInfo', route.params.id)
  }
  created()

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

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
