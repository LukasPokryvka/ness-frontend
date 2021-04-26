<template>
	<header>
		<h1>🤷‍♂️ TODO List 🤷‍♂️</h1>
		<div>
			<input v-model.trim="todo" type="text" @keyup.enter="addTodo" />
			<button @click="addTodo">+</button>
		</div>
	</header>
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
export default {
	setup() {
		const store = useStore()
		const todo = ref('')

		/*
		 * funkcia vola addTodo v store, posiela hodnotu
		 * odchytenu v inpute
		 */
		function addTodo() {
			if (todo.value) {
				store.dispatch('addTodo', todo.value)
				console.log(todo.value)
				todo.value = ''
			}
		}

		return {
			store,
			todo,
			addTodo
		}
	}
}
</script>

<style lang="css" scoped>
header h1 {
	text-align: center;
	color: white;
	font-size: 4rem;
}

header div {
	position: relative;
}

header input {
	width: 100%;
	border-radius: 20px;
	padding: 0.8rem;
	font-size: 1rem;
	border: none;
}

button {
	position: absolute;
	right: 0;
	top: 0;
	background: none;
	cursor: pointer;
	padding: 0.22rem 0.9rem;
	opacity: 0.5;
	font-size: 2rem;
	transition: all 0.2s ease-in-out;
	color: #ff6f91;
}

button:hover {
	opacity: 1;
}

header input,
button {
	font-weight: 500;
}

@media screen and (max-width: 450px) {
	header h1 {
		font-size: 2rem;
	}
}

@media screen and (max-width: 300px) {
	header input {
		padding: 0.6rem;
	}

	button {
		padding: 0.28rem 0.9rem;
		font-size: 1.6rem;
	}
}
</style>
