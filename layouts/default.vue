<template>
  <div>
    <main-header/>
    <section class="container">
      <div class="container__left">
        <nuxt/>
      </div>
      <div class="container__right">
        <my-sidebar></my-sidebar>
      </div>
    </section>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~/components/Footer.vue'
import MainHeader from '~/components/MainHeader.vue'
import MySidebar from '~/components/Sidebar.vue'

export default {
	components:{
      MyFooter,
      MainHeader,
      MySidebar
    },
}
</script>

<style>
</style>
