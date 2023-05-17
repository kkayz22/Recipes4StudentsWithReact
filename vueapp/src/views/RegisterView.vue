<template>
    <v-container style="max-width: 40rem;">
        <h1>Register</h1>
        <v-divider style="margin: 1em 0 2em 0;"></v-divider>
        <form @submit.prevent="submit">
            <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="E-mail"
                type="email"></v-text-field>

            <v-text-field v-model="index.value.value" :counter="6" :error-messages="index.errorMessage.value"
                label="Index" type="number"></v-text-field>

            <v-text-field v-model="password.value.value" :counter="21" :error-messages="password.errorMessage.value"
                label="Password" type="password" hint="Make sure to provide a strong password :)!"></v-text-field>

            <v-text-field v-model="name.value.value" :counter="22" :error-messages="name.errorMessage.value"
                label="Name"></v-text-field>

            <v-select v-model="select.value.value" :items="items" :error-messages="select.errorMessage.value"
                label="Field"></v-select>

            <v-btn class="me-4" type="submit">
                submit
            </v-btn>

            <v-btn @click="handleReset">
                clear
            </v-btn>
        </form>
    </v-container>
</template>
<script>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

export default {
    setup() {
        const { handleSubmit, handleReset } = useForm({
            validationSchema: {
                name(value) {
                    if (value?.length >= 2) return true

                    return 'Name needs to be at least 2 characters.'
                },
                index(value) {
                    if (value?.length == 6) return true
                    return "Index needs to have exactly 6 characters"
                },
                password(value) {
                    if (value?.length > 6 && /[0-9-a-z-A-Z]+/.test(value)) return true

                    return 'Password needs have at least 6 digits.'
                },
                email(value) {
                    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

                    return 'Must be a valid e-mail.'
                },
                select(value) {
                    if (value) return true

                    return 'Select an item.'
                },
                checkbox(value) {
                    if (value === '1') return true

                    return 'Must be checked.'
                },
            },
        })
        const email = useField('email')
        const index = useField('index')
        const password = useField('password')
        const name = useField('name')
        const select = useField('select')
        const checkbox = useField('checkbox')

        const items = ref([
            'Automatyka i Robotyka',
            'Elektrotechnika',
            'Energia Odnawialna',
            'Informatyka',
        ])

        const submit = handleSubmit(values => {
            alert(JSON.stringify(values, null, 2))
        })

        return { name, index, password, email, select, checkbox, items, submit, handleReset }
    },
}
</script>
