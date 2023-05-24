<template>
	<v-card class="mx-auto" max-width="400">
		<v-img :src="recipe.imageURL" height="200px" cover></v-img>
		<v-card-title>
			{{ recipe.title }}
		</v-card-title>
		<v-card-subtitle>
			Added by {{ recipe.userID }}
		</v-card-subtitle>
		<v-card-actions>
			<v-btn color="orange-lighten-2" variant="text" v-if="recipe.recipeURL">
				<router-link :to="recipe.recipeURL" target="_blank">
					Visit the recipe page
				</router-link>
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
		</v-card-actions>
		<v-expand-transition>
			<div v-show="show">
				<v-divider></v-divider>
				<v-card-text>
					{{ recipe.description }}
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>
<script>
export default {
	props: {
		recipe: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			show: false,
		}
	}
}

</script>