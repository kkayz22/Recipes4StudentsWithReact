import { createRouter, createWebHashHistory } from 'vue-router'

import { useAuthStore } from '@/stores'

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

router.beforeEach(async (to) => {
  const privatePage = ["/add"]
  const authReq = privatePage.includes(to.path)
  const auth = useAuthStore()

  if (authReq && !auth.user) {
    auth.returnUrl = to.fullPath
    return "/login"
  }
})

export default router;