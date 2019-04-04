import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _7b36f801 = () => interopDefault(import('../pages/debug.vue' /* webpackChunkName: "pages/debug" */))
const _3d8195e1 = () => interopDefault(import('../pages/favorite/index.vue' /* webpackChunkName: "pages/favorite/index" */))
const _626890b7 = () => interopDefault(import('../pages/space/index.vue' /* webpackChunkName: "pages/space/index" */))
const _59486512 = () => interopDefault(import('../pages/auth/forgot_password.vue' /* webpackChunkName: "pages/auth/forgot_password" */))
const _514b5304 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _150f51ab = () => interopDefault(import('../pages/auth/setting.vue' /* webpackChunkName: "pages/auth/setting" */))
const _20ad9ff2 = () => interopDefault(import('../pages/auth/sign.vue' /* webpackChunkName: "pages/auth/sign" */))
const _52feee84 = () => interopDefault(import('../pages/favorite/show.vue' /* webpackChunkName: "pages/favorite/show" */))
const _2203db28 = () => interopDefault(import('../pages/space/show.vue' /* webpackChunkName: "pages/space/show" */))
const _56e63300 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
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

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/debug",
      component: _7b36f801,
      name: "debug"
    }, {
      path: "/favorite",
      component: _3d8195e1,
      name: "favorite"
    }, {
      path: "/space",
      component: _626890b7,
      name: "space"
    }, {
      path: "/auth/forgot_password",
      component: _59486512,
      name: "auth-forgot_password"
    }, {
      path: "/auth/login",
      component: _514b5304,
      name: "auth-login"
    }, {
      path: "/auth/setting",
      component: _150f51ab,
      name: "auth-setting"
    }, {
      path: "/auth/sign",
      component: _20ad9ff2,
      name: "auth-sign"
    }, {
      path: "/favorite/show",
      component: _52feee84,
      name: "favorite-show"
    }, {
      path: "/space/show",
      component: _2203db28,
      name: "space-show"
    }, {
      path: "/",
      component: _56e63300,
      name: "index"
    }],

    fallback: false
  })
}
