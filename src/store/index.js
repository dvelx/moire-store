import { createStore } from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

export default createStore({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: [],
    addToCartError: null,

    loadingCart: false
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.id === item.productId).product

        return {
          ...item,
          product
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0)
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts.reduce((acc, val) => val.amount + acc, 0);
    }

  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey
    },
    updateCartProductData(state, items) {
      state.cartProductsData = items
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo
    },
    resetCart(state) {
      state.cartProducts = []
      state.cartProductsData = []
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId)
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.id,
          amount: item.quantity,
          color: item.color,
          image: item.color.gallery[0].file.url,
          size: item.size,

        }
      })
    },
    updateCartProductAmount(state, {productId, amount}) {
      const item = state.cartProducts.find(item => item.productId === productId);

      if(item) {
        item.amount = amount
      }
    },

  },
  actions: {
    loadOrderInfo(context, orderId) {
      context.state.loadingCart = true
      setTimeout(() => {
        return axios
          .get(API_BASE_URL + '/orders/' + orderId, {
            params: {
              userAccessKey: context.state.userAccessKey
            }
          })
          .then(res => {
            context.commit('updateOrderInfo', res.data)
            context.state.loadingCart = false
          })
      }, 1000)
    },
    loadCart(context) {
      context.state.loadingCart = true
      return (new Promise(res => setTimeout(res, 1500)))
        .then(() => {
          return axios
                  .get(API_BASE_URL + '/baskets', {
                    params: {
                      userAccessKey: context.state.userAccessKey
                    }
                  })
                  .then(res => {
                    if(!context.state.userAccessKey) {
                      localStorage.setItem('userAccessKey', res.data.user.accessKey)
                      context.commit('updateUserAccessKey', res.data.user.accessKey)
                    }
                    context.commit('updateCartProductData', res.data.items)
                    context.commit('syncCartProducts')
                  })
        })
        .then(() => context.state.loadingCart = false)
    },
    addProductToCart(context, { productId, colorId, sizeId, amount }) {
      context.state.addToCartError = null
      return axios
              .post(API_BASE_URL + '/baskets/products', {
                productId: productId,
                colorId: colorId,
                sizeId: sizeId,
                quantity: amount
              }, {
                params: {
                  userAccessKey: context.state.userAccessKey
                }
              })
              .then(res => {
                  context.commit('updateCartProductData', res.data.items)
              })
              .catch(err => {
                if (err.response.status === 400 && err.response.data.error.request.colorId) {
                  context.state.addToCartError = 'Нужно выбрать цвет'
                }
                if (err.response.status === 400 && err.response.data.error.request.sizeId) {
                  context.state.addToCartError = 'Нужно выбрать размер'
                }
              })

    },
    updateCartProductAmount(context, {productId, amount}) {
      context.commit('updateCartProductAmount', {productId, amount})

      if(amount < 1) {
        return
      }

      return axios
                .put(API_BASE_URL + '/baskets/products', {
                  basketItemId: productId,
                  quantity: amount
                }, {
                  params: {
                    userAccessKey: context.state.userAccessKey
                  }
                })
                .then(res => {
                  context.commit('updateCartProductAmount', res.data.items)
                })
                .catch(() => {
                  context.commit('syncCartProducts')
                })
    },
    deleteProductToCart(context, productId) {
      context.commit('deleteCartProduct', productId)
      return axios
                .delete(API_BASE_URL + '/baskets/products', {
                  data: { basketItemId: productId },
                  params: { userAccessKey: context.state.userAccessKey}
                })
                .then(res => {
                  context.commit('updateCartProductData', res.data.items)
                  context.commit('syncCartProducts')
                })
    }
  },
  modules: {
  },
});
