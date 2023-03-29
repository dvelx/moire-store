<template>

  <label class="form__label">

    <slot/>
    <span class="form__value">{{ title }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>

</template>

<script setup>
  const props = defineProps({
    title: String,
    error: String
  })
</script>

