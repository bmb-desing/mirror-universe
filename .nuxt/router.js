import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _ae006f76 = () => import('..\\pages\\posts.vue' /* webpackChunkName: "pages_posts" */).then(m => m.default || m)
const _eb3bdb2a = () => import('..\\pages\\ask.vue' /* webpackChunkName: "pages_ask" */).then(m => m.default || m)
const _582d1fae = () => import('..\\pages\\partners.vue' /* webpackChunkName: "pages_partners" */).then(m => m.default || m)
const _006fddc4 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)
const _7f40f4d3 = () => import('..\\pages\\_category\\index.vue' /* webpackChunkName: "pages__category_index" */).then(m => m.default || m)
const _c54314fc = () => import('..\\pages\\_category\\_post\\index.vue' /* webpackChunkName: "pages__category__post_index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/posts",
			component: _ae006f76,
			name: "posts"
		},
		{
			path: "/ask",
			component: _eb3bdb2a,
			name: "ask"
		},
		{
			path: "/partners",
			component: _582d1fae,
			name: "partners"
		},
		{
			path: "/",
			component: _006fddc4,
			name: "index"
		},
		{
			path: "/:category",
			component: _7f40f4d3,
			name: "category"
		},
		{
			path: "/:category/:post",
			component: _c54314fc,
			name: "category-post"
		}
    ],
    
    
    fallback: false
  })
}
