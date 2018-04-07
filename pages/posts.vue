<template>
    <section class="container">
        <div class="container__left">
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
            <nav id="pagination" class="paginator">
                <ul class="page-numbers">
                    <li v-if="currentPage != 1" class="first">
                        <nuxt-link :to="{ path: '/posts', query: { page: '1' } }" @click.native="changePage(1)" exact>В начало</nuxt-link>
                    </li>
                    <li v-for="num in this.pageNumbers" v-if="num != null" >
                        <nuxt-link v-if="num != $route.query.page && num != currentPage" :to="{ path: '/posts', query: { page: num } }" @click.native="changePage(num)" exact>{{ num }}</nuxt-link>
                        <span v-else>{{num}}</span>
                    </li>
                    <li v-if="currentPage != count" class="last">
                        <nuxt-link :to="{ path: '/posts', query: { page: count } }" @click.native="changePage(count)" exact>В конец</nuxt-link>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>

<script>
    import axios from '~/plugins/axios'
    export default {
        asyncData ({query ,error }) {
            const page = query.page || 1
            return axios.get('/api/posts?page=' +page)
                .then((res) => {
                    return { posts: res.data.posts , count: res.data.count}
                })
                .catch((e) => {
                    error({ statusCode: 404, message: 'Страница не найдена' })
                })
        },
        head () {
            return {
                title:  this.$route.query.page && this.$route.query.page != 1 ? 'Статьи. Страница '+ this.$route.query.page : 'Статьи' ,
                meta: [
                    {hid: 'description', name: 'description', content: 'Страница всех записей' }
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
                axios.get('/api/posts?page='+num).then((data) => {
                    this.posts = data.data.posts
                })
                this.setPageNumbers()
            }
        },
    }
</script>

<style>

</style>
