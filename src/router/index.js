import AdminView from '@/views/AdminView.vue'
import FeedbackView from '@/views/FeedbackView.vue'
import HomeView from '@/views/HomeView.vue'
import LocationView from '@/views/LocationView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/register',
      component: RegisterView,
    },
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/locations',
      component: LocationView,
    },
    {
      path: '/feedbacks',
      component: FeedbackView,
    },
    {
      path: '/profile',
      component: ProfileView,
    },
    {
      path: '/admin',
      component: AdminView,
    },
  ],
})

export default router
