<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer__left">
        <ul>
          <nuxt-link :to="`/${item.alias}`" tag="li" class="menu__item" v-for="(item, key) in menu" :key="key">
            <a>{{item.title}}</a>
          </nuxt-link>
        </ul>
      </div>
      <div class="footer__center">
        <div class="footer__top">
          <a href="#" target="_blank" class="header__social">
            <i class="fa fa-vk" aria-hidden="true"></i>
          </a>
          <a href="https://t.me/zerkalnaya_vselenayaa" target="_blank" class="header__social">
            <i class="fa fa-telegram" aria-hidden="true"></i>
          </a>
          <a href="#" target="_blank" class="header__social">
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </a>
        </div>
        <div class="footer__middle">

        </div>
        <div class="footer__bottom">
          <div>
            <nuxt-link :to="'/ask'">Задать вопрос</nuxt-link>
          </div>
          <div>
            <nuxt-link :to="'/partners'">Наши партнеры</nuxt-link>
          </div>
        </div>
      </div>
      <div class="footer__right">
        <div class="footer__advertising">

        </div>
      </div>
    </div>

  </footer>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
      name: 'my-footer',
      computed: {
        ...mapGetters({
            menu: 'getMenu'
        })
      }
  }
</script>
