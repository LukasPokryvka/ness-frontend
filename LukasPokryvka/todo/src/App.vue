<template>
	<OpenCalcButton @click="isCalc = true" />
	<Calculator v-if="isCalc" @close-calculator="isCalc = false" />
	<div class="wrapper">
		<TodoHeader />
		<main>
			<TodoList />
		</main>
	</div>
</template>

<script>
import TodoHeader from './components/Todo/TodoHeader.vue'
import TodoList from './components/Todo/TodoList.vue'
import OpenCalcButton from './components/Calculator/OpenCalcButton'
import Calculator from './components/Calculator/Calculator'
import { ref } from 'vue'

export default {
	name: 'App',
	components: {
		TodoHeader,
		TodoList,
		OpenCalcButton,
		Calculator
	},
	setup() {
		// stav, ktory urcuje, ci je kalkulacka otvorena
		const isCalc = ref(false)
		return { isCalc }
	}
}
</script>

<style>
button {
	border: none;
}

button:focus,
input:focus,
select:focus {
	outline: none;
}

.wrapper {
	width: 500px;
}

@media screen and (max-width: 600px) {
	.wrapper {
		width: 90%;
	}
}
</style>
