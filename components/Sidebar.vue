<template>
    <aside class="sidebar">
        <h2 class="sidebar__title">Рекомендуем</h2>
        <div class="sidebar__post">
            <div v-for="post in getPosts" :key="post.id" class="post__items">
                <h3><nuxt-link :to="'/' + post.cat.alias + '/' + post.alias">{{post.title}}</nuxt-link></h3>
                <div class="post__text">{{post.shortText}}</div>
                <hr>
            </div>
        </div>
        <h2 class="sidebar__title" v-if="getComments.length">Коментарии</h2>
        <div class="comments"  v-if="getComments.length">
            <div class="comment" v-for="com in getComments" :key="com.id">
                <nuxt-link :to="'/' + com.post.cat.alias + '/' + com.post.alias + '#comment' + com.id">{{com.text}}</nuxt-link>
            </div>
        </div>
        <div class="sidebar__advertising">

        </div>
        <div class="sidebar__content">
            <div class="item">
                <a href="https://bmb-design.ru/" target="_blank">www.bmb-design.ru<br/>Разработка: сайтов, логотипов, реклама</a>
            </div>
        </div>
    </aside>
</template>

<script>
    import {mapGetters} from 'vuex'
	export default {
		name: "sidebar",
        computed: {
          ...mapGetters({
            getPosts: 'getPosts',
            getComments: 'getComments'
          })
        }
	}
</script>

<style>

</style>