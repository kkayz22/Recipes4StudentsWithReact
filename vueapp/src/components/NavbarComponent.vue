<template>
    <v-toolbar app>
        <v-toolbar-title>
            <router-link to="/" style="cursor: pointer; color: black; text-decoration: none;">
                {{ appTitle }}
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only" v-if="authStore.user">
            <v-btn flat v-for="item in menuItemsAfterLogin" :key="item.title" :to="item.path" @click="handleLogout(item.title)">
                {{ item.title }}
            </v-btn>
        </v-toolbar-items>
        <v-toolbar-items class="hidden-xs-only" v-else>
            <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
                {{ item.title }}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import { useAuthStore } from '@/stores';

export default {
    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },
    data() {
        return {
            appTitle: "r4s",
            menuItems: [
                { title: "Add a recipe", path: "/add" },
                { title: "Login", path: "/login" },
                { title: "Register", path: "/register"}
            ],
            menuItemsAfterLogin: [
                { title: "Add a recipe", path: "/add" },
                { title: "Logout", path: "/" }
            ]
        }
    },
    methods: {
        handleLogout(title) {
            if (title === "Logout") {
                this.authStore.logout()
            } else {
                return
            }
        }
    }
}
</script>

<style></style>