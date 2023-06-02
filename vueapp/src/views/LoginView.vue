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
                <div v-if="loading">
                    <v-progress-circular :width="5" :size="20" color="gray" indeterminate></v-progress-circular>
                </div>
                <div v-else>
                    sign in
                </div>
            </v-btn>
            <v-alert title="Authentication error" icon="mdi-firework" style="margin-top: 1rem;" variant="outlined"
                type="error" v-if="apiErr" prominent border="top">
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
        const loading = ref(false)

        const submit = handleSubmit(async (values) => {
            try {
                loading.value = true
                console.log(values)
                await authStore.login(values)
                loading.value = false
            }
            catch (error) {
                apiErr.value = error.response.data
                console.log(apiErr)
            }
        })

        return { email, password, submit, apiErr, loading }
    },
}
</script>