import Vue from 'vue'
import Vuex from 'vuex'
import User from './user'
import Menu from './menu'
Vue.use(Vuex)
const store = () => new Vuex.Store({
    modules: {
        User,
        Menu
    }
})
export default store