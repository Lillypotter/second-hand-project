import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Show from '../views/show.vue' 
import Publish from '../views/publish.vue'
import Mycenter from '../views/mycenter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children:[
        {
          path: '/show',
          name: 'show',
          component: Show,
        },
        {
          path: '/publish',
          name: 'publish',
          component: Publish,
        },
        {
          path: '/mycenter',
          name: 'mycenter',
          component: Mycenter,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
