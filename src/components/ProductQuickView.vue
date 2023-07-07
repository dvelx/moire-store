<template>
  <div v-if="product">
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="activeImage || '/img/placeholder.png'" :alt="product.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="item in product.colors">
            <button class="pics__link" :class="item.gallery ? (item.gallery[0].file.url === activeImage ? 'pics__link--current' : '') : ''">
              <img width="98" height="98" :src="item.gallery ? item.gallery[0].file.url : 'img/placeholder.png'" alt="Название товара">
            </button>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <div class="item__row item__row--center">
              <BaseCounter v-model:amount.number="productAmount"/>

              <b class="item__price">
                {{ product.priceFormat }} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="(property, index) of product.colors">
                    <label class="colors__label">
                      <input class="colors__radio sr-only"  type="radio" name="color-item" :value="property.color.id" v-model="colorId">
                      <span class="colors__value" :style="{backgroundColor: property.color.code}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>


              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" name="sizes" v-model="sizeId">
                    <option value="0">Размеры</option>
                    <option :value="size.id" v-for="size of product.sizes" :key="size.id">{{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
            <BaseModal v-model:open="isShowAddedModal">
              <p v-if="!store.state.addToCartError">Товар Добавлен в корзину</p>
              <p v-else>{{ store.state.addToCartError }}</p>
            </BaseModal>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
  import {useStore} from "vuex";
  import {computed, ref} from "vue";
  import useProduct from "@/hooks/useProduct";
  import BaseCounter from "@/components/BaseCounter.vue";
  import BaseModal from "@/components/BaseModal.vue";
  const props = defineProps({
    productId: {
      type: [Number, String],
      required: true
    }
  })
  const store = useStore()
  const productAmount = ref(1)
  const { product, fetchProduct, colorId, sizeId} = useProduct()
  const isShowAddedModal = ref(false)
// тут вызываем action из store для добавления товара в корзину
  const addToCart = () => {
    store.dispatch('addProductToCart', {productId: product.value.id, amount: productAmount.value, colorId: colorId.value, sizeId: sizeId.value})
    isShowAddedModal.value = true
  }
  // Вычисления активного изображения товара для смены изображения по клику на цвет товара
  const activeImage = computed(() => {
    const currentProduct = product.value.colors.find(item => item.color.id === colorId.value)
    if (currentProduct === undefined) {
      return product.value.colors[0].gallery[0].file.url
    } else {
      return currentProduct.gallery ? currentProduct.gallery[0].file.url : 'img/placeholder.png'
    }
  })
    // получения определенного товара по ID
  fetchProduct(props.productId)
</script>

  <style>
  button {
    border: none;
    padding: 0;
    margin: 0;
  }
</style>

