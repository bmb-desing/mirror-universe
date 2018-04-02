export default {
    state: {
        visits: [],
        rating: [],
        comments: []
    },
    getters: {
        getVisits: (state) => {
            return state.visits
        },
        getRating: (state) => {
            return state.rating
        },
        getComments: (state) => {
            return state.comments
        },
        isUserComment: (state) => (id) => {
          status = state.comments.find(comment => comment.id == id)
          return status ? true : false
        }
    },
    mutations: {},
    actions: {}
}