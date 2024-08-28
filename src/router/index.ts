import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TabStops from "../tabs/TabStops.vue";
import TabLines from "../tabs/TabLines.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Bus Lines',
    component: TabLines
  },
  {
    path: '/stops',
    name: 'Bus Stops',
    component: TabStops
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
