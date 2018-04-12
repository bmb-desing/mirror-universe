<template>
    <div class="post__item">
        <div class="post__left">
            <nuxt-link :to="'/' + post.cat.alias + '/' + post.alias" v-if="post.thumbnail"  @click.native="addVisit(post.id)">
                <img :src="post.thumbnail" :alt="post.title" >
            </nuxt-link>
        </div>
        <div class="post__right">
            <div class="post__category">
                <nuxt-link :to="'/'+ post.cat.alias">{{post.cat.title}}</nuxt-link>
            </div>
            <h2 class="post__title">
                <nuxt-link :to="'/' + post.cat.alias + '/' + post.alias" @click.native="addVisit(post.id)">{{post.title}}</nuxt-link>
            </h2>
            <div class="meta">
                <div class="meta__item">
                    <span class="meta__bg meta__bg_visits"></span>
                    <span class="meta__text">{{post.visits}}</span>
                </div>
                <div class="meta__item">
                    <span class="meta__bg meta__bg_com"></span>
                    <span class="meta__text">{{post.comments.length}}</span>
                </div>

                <div class="meta__item">
                    <span class="meta__bg meta__bg_rating"></span>
                    <span class="meta__text">{{post.rating != 0 ? (post.rating/post.ratingCount).toFixed(2) : 0}} ({{post.ratingCount}})</span>
                </div>
                <div class="meta__item">
                    <span class="meta__bg meta__bg_time"></span>
                    <span class="meta__text">
                        {{dateForHumans(post.createdAt)}}
                    </span>
                </div>
            </div>
            <div class="post__text">

                {{post.shortText}}...
            </div>
        </div>
    </div>
</template>

<script>
    import peryod from'~/plugins/period.js'
	import {mapActions} from 'vuex'
    export default {
        name: "post",
        props: ['post'],
        methods: {
            ...mapActions({
                addVisit: 'addVisit'
            })
        },
        methods: {
            dateForHumans(post) {
                return peryod(post)
            }
        }
    }
</script>

<style>

</style>