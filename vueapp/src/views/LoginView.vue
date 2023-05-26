<template>
    <v-container style="max-width: 40rem;">
        <h1>Login</h1>
        <v-divider style="margin: 1em 0 2em 0;"></v-divider>
        <form @submit.prevent="submit">
            <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"
                type="email"></v-text-field>
            <v-text-field v-model="password.value.value" :counter="21" :error-messages="password.errorMessage.value"
                label="Password" type="password"></v-text-field>
            <v-btn class="me-4 " type="submit">
                submit
            </v-btn>
        </form>
    </v-container>
</template>

<script>
import { useField, useForm } from 'vee-validate'
//import axios from 'axios'

import { useAuthStore } from '@/stores'
//import router from '@/router'

export default {
    setup() {
        const authStore = useAuthStore();
        const { handleSubmit } = useForm()
        const email = useField('email')
        const password = useField('password')

        const submit = handleSubmit(values => {
            console.log(values);
            authStore.login(values);
            /*axios.post("http://localhost:5200/Auth/Login", values, {
                withCredentials: true
            }).then(function (response) {
                console.log(response.data)
                localStorage.setItem("token", response.data.token)
            }).catch(function (error) {
                console.log(error)
            })
            router.push("/")*/
        })

        return { email, password, submit }
    },
}
</script>