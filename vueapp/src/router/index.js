import { createRouter, createWebHashHistory } from 'vue-router'

import MainView from "@/views/MainView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import AddRecipesView from "@/views/AddRecipes.vue"
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  { path: '/', component: MainView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/add', component: AddRecipesView },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;