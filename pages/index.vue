<template>
  <div>
    <div class="post">
      <posts v-for="post in posts" :key="post.id" :post="post"></posts>
    </div>
    <div class="button">
      <nuxt-link :to="'/posts'">Все записи</nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Posts from '~/components/Post.vue'
export default {
  components: {
      Posts
  },
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
          {hid: 'description', name: 'description', content: 'Главная страница' },
          {breadcrumb: 'Home Page'}
        ],
    }
  },
}
</script>

<style>

</style>
