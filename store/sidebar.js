import axios from '~/plugins/axios'
export default {
	state: {
		likesPosts: {},
		lastComments: {}
	},
	getters: {
		getPosts: (state) => {
			return state.likesPosts
		},
		getComments: (state) => {
			return state.lastComments
		}
	},
	mutations: {
		mutationPosts: (state, payload) => {
			return state.likesPosts = payload
		},
		mutationComments: (state, payload) =>  {
			return state.lastComments = payload
		}
	},
	actions: {
		async nuxtServerInit({commit}) {
			let {data} = await axios.get('/api/sidebar')
			commit('mutationPosts', data.posts)
			commit('mutationComments', data.comments)
		}
	}
}