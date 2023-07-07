<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'mainpage'}" class="breadcrumbs__link" href="index.html">
            Каталог
          </router-link >
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'cart'}" class="breadcrumbs__link" href="cart.html">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order()">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText title="ФИО" placeholder="Введите ваше полное имя" :error="formError.name" v-model="formData.name"/>
            <BaseFormText title="Адрес доставки" placeholder="Введите ваш адрес" :error="formError.address" v-model="formData.address"/>
            <BaseFormText title="Телефон" placeholder="Введите ваш телефон" :error="formError.phone" v-model="formData.phone"/>
            <BaseFormText title="Email" placeholder="Введи ваш Email" :error="formError.email" v-model="formData.email"/>
            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания"/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="item of delivery" :key="item.id">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" :value="item.id" v-model="formData.deliveryTypeId">
                  <span class="options__value">
                    {{ item.title }} <b v-if="item.price > 0">{{ item.price }}</b>
                  </span>
                </label>
                <span class="form__error-delivery" v-if="formError.length !== 0">{{ formError.deliveryTypeId }}</span>
              </li>

            </ul>

            <div v-if="payment">
              <h3 class="cart__title">Оплата</h3>
              <ul class="cart__options options">
                <li v-for="item of payment" class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" :value="item.id"  v-model="formData.paymentTypeId">
                    <span class="options__value">
                    {{ item.title }}
                  </span>
                  </label>
                  <span class="form__error-delivery" v-if="formError.length !== 0">{{ formError.paymentTypeId }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderPageCart v-for="item in products" :key="item.id" :item="item"/>
          </ul>

          <div class="cart__total">
            <p v-if="formData.deliveryTypeId">Доставка: <b>{{ delivery[(formData.deliveryTypeId) - 1].price }} ₽</b></p>
            <p>Итого: <b>{{ cartAmount }}</b> товара на сумму <b>{{ totalPriceCart }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script setup>
  import BaseFormText from "@/components/BaseFormText.vue";
  import BaseFormTextarea from "@/components/BaseFormTextarea.vue";
  import OrderPageCart from "@/components/OrderPageCart.vue";
  import {API_BASE_URL} from "@/config";
  import axios from "axios";
  import {useStore} from "vuex";
  import {ref,computed, watch} from "vue";
  import numberFormat from "@/helpers/numberFormat";
  import {useRouter} from "vue-router";

  const formData = ref({})
  const formError = ref({})
  const formErrorMessage = ref('')
  const delivery = ref([])
  const payment = ref(null)
  const store = useStore()
  const router = useRouter()

  const products = computed(() => {
    return store.getters['cartDetailProducts']
  })
  // Отправляем данные пользователя в API
  const order = () => {
    axios.post(API_BASE_URL + '/orders', {
      ...formData.value,
    }, {
      params: {
        userAccessKey: store.state.userAccessKey
      }
    })
      .then(res => {
        store.commit('resetCart')
        store.commit('updateOrderInfo', res.data)
        router.push({name: 'orderInfo', params: {id: res.data.id}})
      })
      .catch(error => {
        formError.value = error.response.data.error.request
        formErrorMessage.value = error.response.data.error.message
      })
  }
  //получение способов оплаты
  const loadPayments = (id) => {
    if (formData.value.deliveryTypeId) {
      return axios.get(API_BASE_URL + `/payments?deliveryTypeId=${id}`).then(res => payment.value = res.data || null)
    }
  }
  //получение способов доставки
  const loadDelivery = () => {
    return axios.get(API_BASE_URL + '/deliveries').then(res => delivery.value = res.data)
  }
  loadDelivery()
  // следим за изменением способа доставки
  watch(() => formData.value.deliveryTypeId, () => {
    loadPayments(formData.value.deliveryTypeId)
  })
  //Вычисляем выбранный метод доставки
  const deliveryPrice = computed(() => {
    const selectedDelivery = delivery.value.find(e => e.id === formData.value.deliveryTypeId)
    return selectedDelivery ? selectedDelivery.price : 0
  })
// вычисляем общую стоимость товаров и суммируем ее с стоимостью выбранного способа доставки
  const totalPriceCart = computed(() => {
    if (deliveryPrice) {
      return numberFormat(store.getters['cartTotalPrice'] + Number(deliveryPrice.value))
    }
  })
  //Общее количество товаров в корзине
  const cartAmount = computed(() => {
    return products.value.length
  })

</script>

<style>
 .form__error-delivery {
   font-size: 11px;
   line-height: 14px;
   color: #e02d71;
 }
</style>

