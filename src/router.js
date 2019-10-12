import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Redirection from './components/Redirection.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {path: '/',name: 'home',component: Home},
    {path: '/about',name: 'about',component: About},
    {path: '/:random_string',component: Redirection }
    // catch-all 404: { path: '*', component: NotFoundComponent }
    
  ]
})
