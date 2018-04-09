<template>
  <div class="error">
    <h1 class="title">
      404
    </h1>
    <p class="info">
      Страница не найдена<br/>
      Вернитесь на главную,<br/> или выберите любой интересующий вас раздел
    </p>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      На главную
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: ['error']
}
</script>

<style>
</style>
