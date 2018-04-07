<template>
    <section class="container">
        <div class="container__left">
            <article class="article">
                <h1 class="article__title">
                    {{post.title}}
                </h1>
                <div class="article__text" v-html="post.text"></div>
            </article>
            <script src="//yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script>
            <script src="//yastatic.net/share2/share.js"></script>
            <div class="ya-share2" data-services="vkontakte,facebook,gplus,twitter,blogger,viber,whatsapp,skype,telegram"></div>
            <div class="rating" v-if="getRatingById(post.id)">
                <div class="rating__text">
                    Оцените материал:
                </div>
                <div class="rating__stars">
                    <span v-for="n in 5" @click="addRating({id: post.id, rating: n}).then((result) => {getRat()})">{{n}}</span>
                </div>
            </div>
            <div class="rating rating_get" v-else>
                <div class="rating__background" :style="{width: post.rating/post.ratingCount * 20 +'%'}"> </div>
                <div class="rating__bottom">
                    <div class="rating__price">Средняя оценка: <b>{{(post.rating/post.ratingCount).toFixed(2)}}</b></div>
                    <div class="rating__count">Проголосовало: <b>{{post.ratingCount}}</b></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import axios from '~/plugins/axios'
    export default {
        name: "post",
        asyncData ({params ,error }) {
            return axios.get('/api/post/'+params.category+'/'+params.post).then((res) => {
                return {post: res.data.post, rand: res.data.rand}
            }).catch((e) => {
                error({ statusCode: 404, message: 'Страница не найдена' })
            })
        },
        computed: {
            ...mapGetters({
                getRatingById: 'getRatingById'
            }),
        },
        data() {
          return {
              comment: {
                  name: '',
                  message: '',
                  parent_id: 0
              },
              stars: 0,
              showRating: true
          }
        },
        head()  {
            return {
                title: this.post.title,
                meta: [
                    {hid: 'description', name: 'description' , itemprop: 'description', content: this.post.description},
                    {hid: 'name', itemprop: 'name', name: 'name',  content: this.post.title},
                    {hid: 'image', itemprop: 'image', name: 'image', content: this.post.thumbnail},
                    {hid: 'og:title', name: 'og:title', content: this.post.title },
                    {hid: 'og:type', name: 'og:type', content: 'article'},
                    {hid: 'og:url', name: 'og:url', content: this.$route.fullPath},
                    {hid: 'og:image', name: 'og:image', content: this.post.thumbnail}
                ]
            }
        },
        methods: {
            ...mapActions({
                addRating: 'addRating'
            }),
            getRat(result) {
                const vm = this
                setTimeout( function () {
                    axios.get('/api/post/'+vm.post.cat.alias+'/'+vm.post.alias).then((res) => {
                        vm.post.rating = res.data.post.rating
                        vm.post.ratingCount = res.data.post.ratingCount
                    }).catch((e) => {
                        console.log(e)
                    })
                }, 50)

            }
        }
    }
</script>

<style>

</style>