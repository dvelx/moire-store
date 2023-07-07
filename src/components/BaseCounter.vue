<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="minus(amount)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="img/svg/sprite.svg#icon-minus"></use>
      </svg>
    </button>

    <input type="text" :value="amount" @input="$emit('update:amount', $event.target.value)">

    <button type="button" aria-label="Добавить один товар" @click.prevent="plus(amount)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="img/svg/sprite.svg#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>
<script setup>
  const props = defineProps({
    amount: Number
  })
  const emits = defineEmits([
    'update:amount'
  ])
  // функция изменения props +1
  const plus = (value) => {
    emits('update:amount', value + 1)
  }
  // функция изменения props -1
  const minus = (value) => {
    if(props.amount <= 1) {
      value = 1
    } else {
      emits('update:amount', value - 1)
    }
  }
</script>

