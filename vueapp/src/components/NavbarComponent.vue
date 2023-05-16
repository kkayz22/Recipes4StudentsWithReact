<template>
    <v-toolbar app>
        <span class="hidden-sm-and-up">
            <v-app-bar-nav-icon @click="sidebar = !sidebar">
            </v-app-bar-nav-icon>
        </span>
        <v-toolbar-title>
            <router-link to="/" style="cursor: pointer; color: black; text-decoration: none;">
                {{ appTitle }}
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
                {{ item.title }}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
    data() {
        return {
            appTitle: "Recipes4Students",
            menuItems: [
                { title: "Add a recipe", path: "/add" },
                { title: "Login", path: "/login" },
                { title: "Register", path: "/register"}
            ]
        }
    }
}
</script>

<style></style>