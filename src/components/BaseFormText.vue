<template>

  <BaseFormField :title="title" :error="error">
    <input class="form__input" type="text" v-model="value" name="name" :placeholder="placeholder">
  </BaseFormField>

</template>

<script setup>
  import {computed} from "vue";
  import BaseFormField from "@/components/BaseFormField.vue";

  const props = defineProps({
    title: String,
    error: String,
    placeholder: String,
    modelValue: String
  })
  const emits = defineEmits([
    'update:modelValue'
  ])

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emits('update:modelValue', value)
    }
  })

</script>

