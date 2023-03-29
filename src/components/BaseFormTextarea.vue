<template>

  <BaseFormField :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="dataValue" name="comments" :placeholder="placeholder"></textarea>
  </BaseFormField>

</template>

<script setup>
import {computed} from "vue";
import BaseFormField from "@/components/BaseFormField.vue";

const props = defineProps({
  title: String,
  error: String,
  placeholder: String,
  value: String
})
const emits = defineEmits([
  'input'
])

const dataValue = computed({
  get() {
    return props.value
  },
  set(value) {
    emits('input', value)
  }
})

</script>

