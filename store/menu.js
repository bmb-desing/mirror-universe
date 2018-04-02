import axios from '~/plugins/axios'
export default {
	state: {
		menu: {}
	},
	getters: {
		getMenu: (state) => {
			return state.menu
		}
	},
	mutations: {
		mutationMenu: (state, payload) => {
			return state.menu = payload
		}
	},
	actions: {
		async nuxtServerInit({commit}) {
			let {data} = await axios.get('/api/categories')
				commit('mutationMenu', data)
		}
	}
}