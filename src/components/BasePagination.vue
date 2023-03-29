<template>
   <ul class="catalog__pagination pagination" v-if="pages > 1">
      <li class="pagination__item">
        <button class="pagination__link pagination__link--arrow" :disabled="page === 1"  @click.prevent="prevPage()" aria-label="Предыдущая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="img/svg/sprite.svg#icon-arrow-left"></use>
          </svg>
        </button>
      </li>
      <li class="pagination__item" v-for="pageNumber of pages" :key="pageNumber">
        <a class="pagination__link" :class="{'pagination__link--current' : pageNumber === page}"  @click="paginate(pageNumber)">
          {{ pageNumber }}
        </a>
      </li>
      <li class="pagination__item">
        <button class="pagination__link pagination__link--arrow" :disabled="page === pages"  @click.prevent="nextPage()" aria-label="Следующая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="img/svg/sprite.svg#icon-arrow-right"></use>
          </svg>
        </button>
      </li>
    </ul>
</template>
<script setup>
  import {computed} from "vue";

  const props = defineProps({
    page: Number,
    count: Number,
    perPage: Number
  })
  const emits = defineEmits([
    'update:page'
  ])
  const pages = computed(() => {
    return Math.ceil(props.count / props.perPage)
  })
  const paginate = (page) => {
    return emits('update:page', page)
  }
  const prevPage = () => {
    return emits('update:page', props.page - 1)
  }
  const nextPage = () => {
    return emits('update:page', props.page + 1)
  }
</script>

