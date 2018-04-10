<template>
    <div>
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
        <div class="comment">
            <ul class="comment__list" id="comments">
                <li v-for="(item) in comments" :key="item.id" :id="'comment'+item.id" class="comment__item">
                    <div class="comment__header">
                        <div class="comment__left">
                            Коментарий <a :href="'#comment' + item.id" :name="'comment' + item.id">#{{item.id}}</a> от {{item.name}}
                        </div>
                        <div class="comment__right">
                            <span @click="replaceForm(item.id)">Ответить</span>
                        </div>
                    </div>
                    <div class="comment__text">
                        {{item.text}}
                    </div>
                    <div class="comment__footer" v-if="item.parent_id != 0">
                        Ответ на коментарий <a :href="'#comment' + item.parent_id">{{item.parent_id}}</a>
                    </div>
                    <div class="form" v-if="form.parent_id == item.id">
                        <div class="form__title">
                            <h2>Ответ на коментарий {{form.parent_id}}</h2>
                            <span @click="replaceForm(0)">Закрыть</span>
                        </div>
                        <form @submit.prevent="submitForm" method="post" class="form__wrapper">
                            <div class="form__item">
                                <input type="text" required v-model="form.name" name="name" placeholder="Имя">
                            </div>
                            <div class="form__item">
                                <textarea name="message" required v-model="form.message" placeholder="Сообщение"></textarea>
                            </div>
                            <div class="form__item">
                                <button class="form__button">Отправить</button>
                            </div>
                        </form>
                    </div>
                </li>
            </ul>
            <div class="form" v-if="form.parent_id == 0">
                <div class="form__title">
                    <h2>Написать коментарий </h2>
                </div>
                <form @submit.prevent="submitForm" method="post" class="form__wrapper">
                    <div class="form__item">
                        <input type="text" required v-model="form.name" name="name" placeholder="Имя">
                    </div>
                    <div class="form__item">
                        <textarea name="message" required v-model="form.message" placeholder="Сообщение"></textarea>
                    </div>
                    <div class="form__item">
                        <button class="form__button">Отправить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import axios from '~/plugins/axios'
    export default {
        name: "category-post",
        asyncData ({params ,error }) {
            return axios.get('/api/post/'+params.category+'/'+params.post).then((res) => {
                return {post: res.data.post, rand: res.data.rand, comments: res.data.comments}
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
              form: {
                  name: '',
                  message: '',
                  parent_id: 0,
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

            },
            replaceForm(id)  {
                this.form.name = ''
                this.form.message = ''
                this.form.parent_id = id
            },
            submitForm() {
                return axios.post('/api/addComment', {
                    name: this.form.name,
                    text: this.form.message,
                    postId: this.post.id,
                    parent_id: this.form.parent_id
                }).then((res) => {
                    this.comments.push(res.data)
                    this.replaceForm(0)
                    this.scrollToEnd(res.data.id)
                }).catch((err) => {
                    console.log(err)
                })
            },
            scrollToEnd: function(id) {
                var container = this.$el.querySelector('.comment');
                var h = container.scrollHeight + container.offsetTop
                console.log(h)
                window.scrollTo(0 , h);
            },
        }
    }
</script>

<style>

</style>