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
                sign in
            </v-btn>
            <v-alert title="Authentication error" icon="mdi-firework" style="margin-top: 1rem;" variant="outlined" type="error"
                v-if="apiErr" prominent border="top">
                {{ apiErr }}
            </v-alert>
        </form>
    </v-container>
</template>

<script>
import { useField, useForm } from 'vee-validate'
import { ref } from "vue"

import { useAuthStore } from '@/stores'

export default {
    setup() {
        const authStore = useAuthStore()
        const { handleSubmit } = useForm()

        const email = useField('email')
        const password = useField('password')

        const apiErr = ref("")

        const submit = handleSubmit(async (values) => {
            try {
                console.log(values)
                await authStore.login(values)
            }
            catch (error) {
                apiErr.value = error.response.data
                console.log(apiErr)
            }
        })

        return { email, password, submit, apiErr }
    },
}
</script>