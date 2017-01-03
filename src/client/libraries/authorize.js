import router from './router'
import http from './resource'
import store from './store'

http.interceptors.push((request, next) => {
  // Enable this when you have a backend that you authenticate against
  if (store.getters.token) {
    const headers = request.headers
    if (window.location.pathname !== '/login' && !headers.hasOwnProperty('Authorization')) {
      headers.Authorization = 'JWT ' + store.getters.token
    }
    // console.log(headers)
  }
  next()
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next()
  store.dispatch('checkLoggedIn')
    .then(loggedIn => {
      if (loggedIn) return next()
      console.log('Unauthorized')
      next({ name: 'login', query: { redirect: to.fullPath } })
    })
    .catch(() => next({ name: 'login', query: { redirect: to.fullPath } }))
  // if (store.getters.token) return next()
  // console.log('Unauthorized')
  // next({ name: 'login', query: { redirect: to.fullPath } })
})
