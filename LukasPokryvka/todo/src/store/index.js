import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
	// state drzi hodnoty vsetkych todos
	state() {
		return {
			status: '',
			todos: []
		}
	},
	mutations: {
		// GET na ziskanie vsetkych aktualnych todos, ulozenie do state
		SET_TODOS(state) {
			axios
				.get('http://localhost:3000/todos')
				.then(res => (state.todos = res.data.todos))
		}
	},
	actions: {
		/*
		 * pridanie noveho todo cez POST
		 * nasledna aktualizacia todos v state
		 */
		addTodo(context, payload) {
			axios
				.post('http://localhost:3000/todos', {
					content: payload,
					done: 'false'
				})
				.then(() => {
					context.commit('SET_TODOS')
				})
		},
		/*
		 * vymazanie todo pomocou DELETE cez id
		 * aktualizacia state
		 */
		deleteTodo(context, payload) {
			axios.delete(`http://localhost:3000/todos/${payload}`).then(() => {
				context.commit('SET_TODOS')
			})
		},
		/*
		 * update todo pomocou PATCH cez id, druhy argument je telo
		 * aktaulizacia state
		 */
		updateTodo(context, payload) {
			axios
				.patch(`http://localhost:3000/todos/${payload.id}`, {
					done: payload.doneStatus
				})
				.then(() => {
					context.commit('SET_TODOS')
				})
		}
	},
	getters: {
		// getter ktory vracia aktualny stav state.todos
		getAllTodos: state => {
			return state.todos
		}
	}
})
