<template>
  <div>
    <div class="post">
      <div class="post__item" v-for="post in posts" :key="post.id">
        <div class="post__left">
          <nuxt-link :to="'/' + category.alias + '/' + post.alias" v-if="post.thumbnail">
            <img :src="post.thumbnail" :alt="post.title">
          </nuxt-link>
        </div>
        <div class="post__right">
          <div class="post__category">
            <nuxt-link :to="'/'+ category.alias">{{category.title}}</nuxt-link>
          </div>
          <h2 class="post__title">
            <nuxt-link :to="'/' + category.alias + '/' + post.alias">{{post.title}}</nuxt-link>
          </h2>
          <div class="post__text">
            {{post.shortText}}...
          </div>
        </div>
      </div>
    </div>
    <nav id="pagination" class="paginator">
      <ul class="page-numbers">
        <li v-if="currentPage != 1" class="first">
          <nuxt-link :to="{ name: 'category', params: {category: category.alias}, query: { page: '1' } }" @click.native="changePage(1)" exact>В начало</nuxt-link>
        </li>
        <li v-for="num in this.pageNumbers" v-if="num != null" >
          <nuxt-link v-if="num != $route.query.page && num != currentPage" :to="{ name: 'category' , params: {category: category.alias}, query: { page: num } }" @click.native="changePage(num)" exact>{{ num }}</nuxt-link>
          <span v-else>{{num}}</span>
        </li>
        <li v-if="currentPage != count" class="last">
          <nuxt-link :to="{ name: 'category', params: {category: category.alias}, query: { page: count } }" @click.native="changePage(count)" exact>В конец</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'category',
  asyncData ({ params, query,  error }) {
    const page = query.page || 1
    return axios.get('/api/post/' + params.category + '?page='+page)
      .then((res) => {
        return { posts: res.data.posts, count: res.data.count, category: res.data.cat }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Категория не найдена' })
      })
  },
  head () {
    return {
      title: `Категория: ${this.category.title} ${this.$route.query.page && this.$route.query.page != 1 ? '. Страница '+ this.$route.query.page : ''}`,
      meta: [
          {hid: 'description', name: 'description', content: this.category.description }
      ]
    }
  },
  data () {
      return {
          prevpage: null,
          nextpage: null,
          currentPage: null,
          pageNumbers: [],
          pageNumberCount: null,
      }
  },
  mounted () {
      this.setPageNumbers()
  },
  methods: {
        setPages (currentPage, totalPageCount) {
            this.pageNumbers = []
            console.log(currentPage)
            this.prevpage = currentPage > 1 ? (currentPage - 1) : null
            if (!totalPageCount) {
                this.nextpage = this.$route.query.page ? (parseInt(this.$route.query.page) + 1) : 2
            } else {
                this.nextpage = currentPage < totalPageCount ? (parseInt(currentPage) + 1) : null
            }
            for (let i = 0; i < 7; i++) {
                let pages = ((currentPage) - 4) + i
                if (pages >= 1 && pages <= parseInt(this.count)){
                    this.pageNumbers.push(pages)
                    this.pageNumberCount++
                }
            }
        },
        setPageNumbers () {
            let _currentPage = this.$route.query.page ? this.$route.query.page : 1
            this.currentPage = _currentPage
            this.setPages(_currentPage, this.count)
        },
        changePage(num) {
            axios.get('/api/post/'+this.category.alias+'?page='+num).then((data) => {
                this.posts = data.data.posts
            })
            this.setPageNumbers()
        }
    },
}
</script>

<style>

</style>
