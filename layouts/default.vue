<template>
  <div>
    <main-header/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~/components/Footer.vue'
import MainHeader from '~/components/MainHeader.vue'

export default {
	components:{
      MyFooter,
      MainHeader
    }
}
</script>

<style>
</style>
