<template>
   <v-container style="max-width: 40rem;">
      <h1>New Recipe</h1>
      <v-divider style="margin: 1em 0 2em 0;"></v-divider>
      <form @submit.prevent="submit">
         <v-text-field 
            v-model="Title.value.value" 
            :counter="20" 
            :error-messages="Title.errorMessage.value" 
            label="Title">
        </v-text-field>
         <v-text-field 
            v-model="Description.value.value" 
            :counter="40" 
            :error-messages="Description.errorMessage.value" label="Description">
        </v-text-field>
         <v-text-field 
            v-model="ImageURL.value.value" 
            :error-messages="ImageURL.errorMessage.value"
            label="Image Link"
            hint="Make sure to provide a valid link url">
        </v-text-field>
         <v-text-field 
            v-model="RecipeURL.value.value" 
            :error-messages="RecipeURL.errorMessage.value"
            label="Recipe Link">
        </v-text-field>
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
import { useField, useForm } from 'vee-validate'
import axios from "axios"

import { useAuthStore } from '@/stores'
import router from "../router/index"
import { storeToRefs } from 'pinia'

export default {
    setup() {
        const authStore = useAuthStore()
        const { user: authUser } = storeToRefs(authStore)

        const { handleSubmit, handleReset } = useForm({
            initialValues: {
                Title: "",
                Description: "",
                ImageURL: "",
                RecipeURL: "",
                Username: authUser.value.user.username,
                Index: authUser.value.user.index
            },
            validationSchema: {
                Title(value) {
                    if (value?.length >= 5 && value?.length <= 20) return true

                    return 'Bigger than 5 smaller than 20'
                },
                Description(value) {
                    if (value?.length >= 5 && value?.length <= 40) return true
                    return "Max 40 characters"
                },
                ImageURL(value) {
                    if (/([a-z\-_0-9]*\.(jpg|jpeg|png|gif))/i.test(value)) return true

                    return 'Needs to be a valid URL'
                },
                RecipeURL(value) {
                    if (value?.length > 2) return true

                    return 'No idea honestly'
                },
            },
        })
        const Title = useField('Title')
        const Description = useField('Description')
        const ImageURL = useField('ImageURL')
        const RecipeURL = useField('RecipeURL')

        const submit = handleSubmit(values => {
            console.log(values)
            const headers = { 'Authorization': `Bearer ${authUser.value.token}` }
            axios.post("http://localhost:5200/api/Recipes", values, {headers})
            .then(function(response) {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
            handleReset()
            router.push("/")
        })

        return { Title, Description, ImageURL, RecipeURL, submit, handleReset }
    },
}
</script>