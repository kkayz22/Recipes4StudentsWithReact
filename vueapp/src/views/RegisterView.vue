<template>
    <v-container style="max-width: 40rem;">
        <h1>Register</h1>
        <v-divider style="margin: 1em 0 2em 0;"></v-divider>
        <form @submit.prevent="submit">
            <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"
                type="email"></v-text-field>

            <v-text-field v-model="index.value.value" :counter="6" :error-messages="index.errorMessage.value" label="Index"
                type="number"></v-text-field>

            <v-text-field v-model="password.value.value" :counter="21" :error-messages="password.errorMessage.value"
                label="Password" type="password" hint="Make sure to provide a strong password :)!"></v-text-field>

            <v-text-field v-model="username.value.value" :counter="22" :error-messages="username.errorMessage.value"
                label="Name"></v-text-field>

            <v-select v-model="field.value.value" :items="items" :error-messages="field.errorMessage.value"
                label="Field"></v-select>

            <v-btn class="me-4" type="submit">
                submit
            </v-btn>
        </form>
    </v-container>
</template>
<script>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import axios from "axios"

import router from '@/router'

export default {
    setup() {
        const { handleSubmit, handleReset } = useForm({
            validationSchema: {
                username(value) {
                    if (value?.length >= 2) return true
                    else return 'Name needs to be at least 2 characters.'
                },
                index(value) {
                    if (value?.length == 6) return true
                    else return "Index needs to have exactly 6 characters"
                },
                password(value) {
                    if (value?.length > 6 && /[0-9-a-z-A-Z]+/.test(value)) return true
                    else return 'Password needs have at least 6 digits.'
                },
                email(value) {
                    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
                    else return 'Must be a valid e-mail.'
                },
                field(value) {
                    if (value) return true
                    else return 'Select an item.'
                }
            }
        })
        const email = useField('email')
        const index = useField('index')
        const password = useField('password')
        const username = useField('username')
        const field = useField('field')

        const items = ref([
            'Automatyka i Robotyka',
            'Elektrotechnika',
            'Energia Odnawialna',
            'Informatyka',
        ])

        const submit = handleSubmit(values => {
            console.log(values)
            axios.post("http://localhost:5200/Auth/register", values)
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
            router.push("/login")
        })

        return { username, index, password, email, field, items, submit, handleReset }
    },
}
</script>
