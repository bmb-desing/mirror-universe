<template>
    <div class="ask">
        <div class="ask__wrapper">
            <h1>Задайте свой вопрос</h1>
            <form method="post" @submit.prevent="submitAsk">
                <div class="ask__item">
                    <input type="text" required v-model="ask.name" name="name" placeholder="Ваше имя">
                </div>
                <div class="ask__item">
                    <input type="email" required v-model="ask.email" name="email" placeholder="Ваш E-mail">
                </div>
                <div class="ask__item">
                    <select name="theme" v-model="ask.theme" required>
                        <option value="" selected disabled>Выберите пункт</option>
                        <option value="Реклама">По вопросу рекламы на сайте</option>
                        <option value="Ошибка в статье">Нашли ошибку на сайте</option>
                        <option value="Другое">Другой вариант</option>
                    </select>
                </div>
                <div class="ask__item">
                    <textarea name="message" placeholder="Ваше сообщение" v-model="ask.message"></textarea>
                </div>
                <div class="ask__item">
                    <p v-if="statusAsk != null" :class="statusAsk ?  'good' : 'error'">{{messageAsk}}</p>
                    <button>Отправить</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
	import axios from '~/plugins/axios'
	export default {
		name: "ask",
        head () {
            return {
                title: 'Задать вопрос',
                meta: [
                    {hid: 'description', name: 'description', content: 'Наши партнеры'}
                ]
            }
        },
        data() {
          return {
            statusAsk: null,
            messageAsk: null,
            ask: {
              name: '',
              email: '',
              message: '',
              theme: ''
            }
          }
        },
        methods: {
			submitAsk() {
				console.log(this.ask)
				return axios.post('/api/ask', {
					name: this.ask.name,
                    email: this.ask.email,
                    theme: this.ask.theme,
                    message: this.ask.message
                }).then((data) => {
                  this.responseAsk(data)
                    this.clearForm()

                }).catch((err) => {
                	console.log(err)
                })
            },
            responseAsk(data) {
				console.log(data)
                this.statusAsk = data.data.status
                this.messageAsk = data.data.message
            },
            clearForm() {
				this.ask.name = ''
                this.ask.email = ''
                this.ask.message = ''
                this.ask.theme = ''
            }
        }
	}
</script>

<style>

</style>