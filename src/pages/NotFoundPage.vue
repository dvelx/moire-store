<template>
  <div class="container content__notfound">
    <h1 class="title">
      Oops!
    </h1>

    <p class="desc">
      404 - PAGE NOT FOUND
    </p>

    <router-link :to="{name: 'mainpage'}" class="button__go-home-page button button--primery">
      GO TO HOME PAGE
    </router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>
.content__notfound {
  display: flex;
  flex-direction: column;
}
  .title {
    text-align: center;
    color: #e02d71;
    font-size: 64px;
    margin-bottom: 10px;
  }
  .desc {
    margin-top: 0;
    text-align: center;
    color: #e02d71;
    font-size: 36px;
    font-weight: bold;
  }
  .button__go-home-page {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

</style>
