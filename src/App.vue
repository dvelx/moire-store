<template>
  <HeaderBlock />

  <router-view :key="$route.fullPath"/>

  <FooterBlock />

  <div id="product-modal"></div>
</template>
<script setup>
  import HeaderBlock from "@/components/HeaderBlock.vue";
  import FooterBlock from "@/components/FooterBlock.vue";
  import {useStore} from "vuex";

  const store = useStore()

// получаем key из LocalStorage
  const userAccessKey = localStorage.getItem('userAccessKey')

  // если в локальном хранилище есть UserKey, то сохраняем его в store
  if(userAccessKey) {
    store.commit('updateUserAccessKey', userAccessKey)
  }

  const loadCart = () => {
    return store.dispatch('loadCart')
  }
  loadCart()
</script>
