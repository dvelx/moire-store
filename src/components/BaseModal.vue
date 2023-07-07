<template>
  <Teleport v-if="open" to="#product-modal">
    <div class="modal__overlay"></div>
    <div class="modal__product" @click="onOutsideClick">
      <div ref="content" class="modal__content">
        <button class="modal__close" @click="doClose">X</button>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
  import {ref} from "vue";

  const props = defineProps({
    open: {
      type: Boolean
    }
  })
  const emits = defineEmits([
    'update:open'
  ])
  const content = ref(null)
  // закрытие модалки по клику вне модального окна
  const onOutsideClick = (event) => {
    if (event.target !== content.value && event.target.contains(content.value)) {
      doClose()
    }
  }
  // метод закрытия модального окна по клику
  const doClose = () => {
    emits('update:open', false)
  }

</script>

<style scoped>
  .modal__overlay {
    z-index: 1010;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: .75;
    background-color: #000000;
  }
  .modal__product {
    z-index: 1010;
    overflow: auto;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .modal__content {
    position: relative;
    max-width: 1000px;
    margin-top: auto;
    margin-bottom: auto;
    padding: 50px;
    background-color: #ffffff;
  }
  .modal__close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 24px;
    height: 24px;
    opacity: 0.2;
    cursor: pointer;
    transition: opacity ease 0.5s;

  }
  .modal__close:hover {
    opacity: 1;
  }
  .modal__close::before,
  .modal__close::after {
    content: '';
    position: absolute;
    top: 10px;
    display: block;
    width: 24px;
    height: 3px;
    background: #000;
  }

  .modal__close::before {
    transform: rotate(45deg);
  }

  .modal__close::after {
    transform: rotate(-45deg);
  }

</style>
