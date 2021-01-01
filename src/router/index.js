import Vue from 'vue'
import VueRouter from 'vue-router'
// Views
import Welcome from '@/views/Welcome'
import Survey from '@/views/Survey'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/survey',
    name: 'Survey',
    component: Survey
  }
]

const router = new VueRouter({
  routes
})

export default router
