<template>
	<v-card class="mx-auto" max-width="400">
		<v-img :src="recipe.imageURL" height="200px" cover></v-img>
		<v-card-title>
			{{ recipe.title }}
		</v-card-title>
		<v-card-subtitle>
			Added by {{ recipe.username }}, s{{ recipe.index }}
		</v-card-subtitle>
		<v-card-actions>
			<v-btn color="orange-lighten-1" variant="text" v-if="recipe.recipeURL" :href="recipe.recipeURL">
				Check the recipe page	
			</v-btn>
			<v-spacer></v-spacer>
			<v-btn @click="show = !show">
				<v-icon icon="mdi-chevron-up" v-if="show"></v-icon>
				<v-icon icon="mdi-chevron-down" v-else></v-icon>
			</v-btn>
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