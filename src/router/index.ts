import { createRouter, createWebHistory } from 'vue-router'
import ExercisesTable from '../views/ExercisesTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'exercises',
      component: ExercisesTable
    }
  ]
})

export default router
