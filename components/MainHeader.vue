<template>
    <header class="header">
        <div class="header__top">
            <div class="wrapper wrapper_flex wrapper_jc">
                <div class="header__left">
                    <nuxt-link :to="'/'">
                        <div class="header__title">Зеркальная вселенная</div>
                        <div class="header__text">разрушение и созидание</div>
                    </nuxt-link>
                </div>
                <div class="header__right">
                    <a href="#" target="_blank" class="header__social">
                        <i class="fa fa-vk" aria-hidden="true"></i>
                    </a>
                    <a href="#" target="_blank" class="header__social">
                        <i class="fa fa-telegram" aria-hidden="true"></i>
                    </a>
                    <a href="#" target="_blank" class="header__social">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="header__menu">
            <nav>
                <ul class="wrapper wrapper_flex wrapper_jc">
                    <nuxt-link :to="`/${item.alias}`" tag="li" class="menu__item" v-for="(item, key) in menu" :key="key">
                        <a>{{item.name}}</a>
                    </nuxt-link>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>

	import {mapGetters} from 'vuex'
    export default {
      name: "main-header",
      computed: {
        ...mapGetters({
          menu: 'getMenu'
        })
      }
    }
</script>

<style>

</style>