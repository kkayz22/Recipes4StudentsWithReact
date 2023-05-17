<template>
   <v-container style="max-width: 40rem;">
      <h1>New Recipe</h1>
      <v-divider style="margin: 1em 0 2em 0;"></v-divider>
      <form @submit.prevent="submit">
         <v-text-field v-model="title.value.value" :error-messages="title.errorMessage.value" label="Title"></v-text-field>

         <v-text-field v-model="description.value.value" :counter="6" :error-messages="description.errorMessage.value" label="Description"></v-text-field>

         <v-text-field v-model="imageUrl.value.value" :counter="21" :error-messages="imageUrl.errorMessage.value"
            label="ImageURL" hint="Make sure to provide a valid link url"></v-text-field>

         <v-text-field v-model="recipeUrl.value.value" :counter="22" :error-messages="recipeUrl.errorMessage.value"
            label="RecipeURL"></v-text-field>

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

export default {
    setup() {
        const { handleSubmit, handleReset } = useForm({
            validationSchema: {
                name(value) {
                    if (value?.length >= 5 && value?.length <= 20) return true

                    return 'Bigger than 5 smaller than 20'
                },
                description(value) {
                    if (value?.length >= 5 && value?.length <= 40) return true
                    return "Max 40 characters"
                },
                imageUrl(value) {
                    if (/([a-z\-_0-9]*\.(jpg|jpeg|png|gif))/i.test(value)) return true

                    return 'Needs to be a valid URL'
                },
                email(value) {
                    if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

                    return 'No idea honestly'
                }
            },
        })
        const title = useField('title')
        const description = useField('description')
        const imageUrl = useField('imageUrl')
        const recipeUrl = useField('recipeUrl')

        const submit = handleSubmit(values => {
            fetch("https://localhost:7220/api/Recipes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: values
            })
        })

        return { title, description, imageUrl, recipeUrl, submit, handleReset }
    },
}
</script>