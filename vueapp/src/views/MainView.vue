<template>
    <v-container style="max-width: 80rem;">
        <h1>Main</h1>
        <v-divider></v-divider>
        <v-row style="margin-top: 1rem;">
            <v-col v-for="recipe in recipes" :key="recipe.id">
                <CardComponent :recipe="recipe" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue';
import axios from 'axios';

export default {
    data() {
        return {
            recipes: []
        };
    },
    methods: {
        async getRecipes() {
            try {
                const response = await axios.get("http://localhost:5200/api/Recipes");
                this.recipes = response.data;
                console.log(this.recipes)
            }
            catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.getRecipes();
    },  
    components: {
        CardComponent
    }
}
</script>