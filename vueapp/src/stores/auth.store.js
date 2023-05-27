import { defineStore } from "pinia";
import axios from "axios"

import router from "@/router";

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")),
        returnUrl: null
    }),
    actions: {
        async login (values) {
            const response = await axios.post("http://localhost:5200/Auth/login", values, {
                withCredentials: true
            });

            this.user = response.data;

            localStorage.setItem("user", JSON.stringify(response.data))
            router.push(this.returnUrl || "/");
        },
        logout() {
            this.user = null;
            localStorage.removeItem("user");
            router.push("/")
        }
    }
})