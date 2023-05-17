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

export default {
    setup() {
        const { handleSubmit } = useForm({
        })
        const email = useField('email')
        const password = useField('password')

        const submit = handleSubmit(values => {
            alert(JSON.stringify(values, null, 2))
        })

        return { email, password, submit }
    },
}
</script>