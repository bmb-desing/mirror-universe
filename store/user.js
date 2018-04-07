import store from "./index";
import axios from '~/plugins/axios'
export default {
    state: {
        visits: [],
        rating: [],
    },
    getters: {
        getVisits: (state) => {
            return state.visits
        },
        getRating: (state) => {
            return state.rating
        },
        getRatingById: (state) => (id) => {
            const rating = state.rating.indexOf(id)
            return rating == -1 ? true : false
        }
    },
    mutations: {
        allRating: (state, payload) => {
            return state.rating = payload
        },
        pushRating: (state, payload) => {
            return state.rating.push(payload)
        },
    },
    actions: {
        addRating: (state, payload) => {
            axios.post('/api/addRating', {
                id: payload.id,
                rating: payload.rating
            }).then((res) => {
                state.commit('pushRating', res.data)
            }).catch((err) => {
                console.log(err)
            })
        },
        async nuxtServerInit({commit}, {req}) {
            commit('allRating', req.session.rating ? req.session.rating : [])
        }
    }
}