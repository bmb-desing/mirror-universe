<template>
  <div>
    <div class="post">
      <div class="post__item" v-for="post in posts" :key="post.id">
        <div class="post__left">
          <nuxt-link :to="'/' + post.cat.alias + '/' + post.alias" v-if="post.thumbnail">
            <img :src="post.thumbnail" :alt="post.title" >
          </nuxt-link>
        </div>
        <div class="post__right">
          <div class="post__category">
            <nuxt-link :to="'/'+ post.cat.alias">{{post.cat.title}}</nuxt-link>
          </div>
          <h2 class="post__title">
            <nuxt-link :to="'/' + post.cat.alias + '/' + post.alias">{{post.title}}</nuxt-link>
          </h2>
          <div class="post__text">
            {{post.shortText}}...
          </div>
        </div>
      </div>
    </div>
    <div class="button">
      <nuxt-link :to="'/posts'">Все записи</nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  asyncData ({ error }) {
      return axios.get('/api/post-index')
          .then((res) => {
              return { posts: res.data}
          })
          .catch((e) => {
              error({ statusCode: 404, message: 'Страница не найдена' })
          })
  },
  head () {
    return {
      title: 'Главная',
        meta: [
            {hid: 'description', name: 'description', content: 'Главная страница' }
        ]
    }
  },
}
</script>

<style>

</style>
