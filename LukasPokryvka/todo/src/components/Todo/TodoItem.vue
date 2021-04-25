<template>
	<li :class="todoDone === 'true' ? 'done' : ''">
		{{ todoContent
		}}<button class="delItem" @click="deleteTodo(todoId)">X</button>
	</li>
</template>

<script>
import { useStore } from 'vuex'
export default {
	props: {
		todoContent: {
			type: String
		},
		todoDone: {
			type: String
		},
		todoId: {
			type: Number
		}
	},
	setup() {
		const store = useStore()

		/*
		 * funkcia vola deleteTodo v store, posiela id,
		 * ktore sa preposiela po kliknuti na X
		 */
		function deleteTodo(id) {
			store.dispatch('deleteTodo', id)
		}
		return {
			store,
			deleteTodo
		}
	}
}
</script>

<style lang="css" scoped>
li {
	margin: 0.4rem 0;
	background-color: #ff6f91;
	padding: 0.5rem;
	display: flex;
	justify-content: space-between;
	border-radius: 15px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	color: white;
}

li:hover {
	transform: scale(1.02);
}

.delItem {
	color: white;
	cursor: pointer;
	opacity: 0.5;
	transition: all 0.2s ease-in-out;
	font-size: 0.7rem;
	border-radius: 50%;
	background-color: transparent;
}

.delItem:hover {
	opacity: 1;
}

.done {
	background-color: #ff9671 !important;
}
</style>
