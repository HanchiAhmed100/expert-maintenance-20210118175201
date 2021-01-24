import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component : () => import('@/views/Login.vue')
  },
  {
    path : '/home',
    component : () => import('@/views/Home.vue')
  },
  {
    path : '/Informations',
    name : 'Informations',
    component : () => import('@/views/Informations.vue')
  },{
    path : '/AddInterventionInfo',
    name : 'AddInterventionInfo',
    component : () => import('@/views/AddInterventionInfo.vue')
  }
]




const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.name == 'Login' && from.name == "Home") next({ name: 'Home' })
  else next()
})

export default router
