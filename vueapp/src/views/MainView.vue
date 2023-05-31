<template>
    <v-container style="max-width: 80rem; display: flex; flex-direction: column; align-items: center;"> 
        <div v-if="loading" style="margin-top: 10em ;display: flex; align-items: center; justify-content: center; height: 100%;">
            <v-progress-circular :width="5" :size="50" color="gray" indeterminate></v-progress-circular>
        </div>
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
            recipes: [],
            loading: false
        };
    },
    methods: {
        async getRecipes() {
            try {
                this.loading = true;
                const response = await axios.get("http://localhost:5200/api/Recipes");
                this.recipes = response.data;
                this.loading = false;
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