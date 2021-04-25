<template>
	<section>
		<transition-group name="todos" tag="ul">
			<TodoItem
				v-for="todo in state.allTodos"
				:key="todo.id"
				:todoContent="todo.content"
				:todoDone="todo.done"
				:todoId="todo.id"
				@click="toggleDoneStatus(todo.id, todo.done)"
			/>
		</transition-group>
	</section>
</template>

<script>
import TodoItem from './TodoItem'
import { computed, onMounted, reactive, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default {
	components: {
		TodoItem
	},
	setup() {
		const store = useStore()
		const state = reactive({
			allTodos: []
		})

		// inicialne nacitanie todos z databazy
		onMounted(() => {
			store.commit('SET_TODOS')
			console.log(state.allTodos)
		})

		/*
		 * funkcia vola updateTodo v store, na zaklade
		 * aktualnej done hodnoty posiela opacnu hodnotu
		 */
		function toggleDoneStatus(id, doneStatus) {
			doneStatus === 'false'
				? store.dispatch('updateTodo', {
						id,
						doneStatus: 'true'
				  })
				: store.dispatch('updateTodo', {
						id,
						doneStatus: 'false'
				  })
		}

		/*
		 * sledovanie stavu todos v store, po zmene nacitanie novych
		 * dat, ktore sa ulozia do lokanej premennej state.allTodos,
		 * ktora sposobi vyrenderovanie novych zmien
		 */
		const getAllTodos = computed(() => store.getters.getAllTodos)
		watchEffect(() => {
			state.allTodos = getAllTodos
		})

		return {
			store,
			state,
			onMounted,
			toggleDoneStatus,
			getAllTodos
		}
	}
}
</script>

<style lang="css" scoped>
ul {
	padding: 0;
	margin: 3rem 0;
	list-style: none;
}

.todos-enter-active,
.todos-leave-active {
	transition: all 0.15s;
}
.todos-enter-from,
.todos-leave-to {
	opacity: 0;
	transform: scale(0.75);
}
</style>
