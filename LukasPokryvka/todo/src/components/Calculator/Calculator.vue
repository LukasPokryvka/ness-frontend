<template>
	<section class="calc-modal">
		<div class="calc-modal-bg" @click="closeCalculator()"></div>
		<div class="calc-modal-container">
			<form id="calcForm" @submit.prevent="calculate()">
				<div class="calc-input">
					<label for="price">How much was your bill?</label>
					<input v-model="state.price" type="number" min="0" step="0.01" />
				</div>
				<div class="calc-input">
					<label for="satis">How was your service?</label>
					<select v-model="state.satis">
						<option value="1.20">Great</option>
						<option value="1.15">Good</option>
						<option value="1.10">Neutral</option>
						<option value="1">Bad</option>
					</select>
				</div>
				<div class="calc-input">
					<label for="people">How many people are sharing the bill?</label>
					<input v-model="state.people" type="number" min="1" />
				</div>
				<button type="submit">Calculate</button>
			</form>
			<h4 class="total-price">You should pay: {{ state.totalPrice }}</h4>
		</div>
	</section>
</template>

<script>
import { reactive } from 'vue'
export default {
	emits: ['close-calculator'],
	setup(_, { emit }) {
		const state = reactive({
			price: null,
			satis: '',
			people: null,
			totalPrice: null
		})

		/*
		 * vypocitanie celkovej sumy a reset formulara
		 */
		function calculate() {
			const totalPrice = ((state.price * state.satis) / state.people).toFixed(2)
			state.totalPrice = totalPrice
			resetForm()
		}

		// reset formulara
		function resetForm() {
			state.price = null
			state.people = null
			state.satis = ''
		}

		/*
		 * emit eventu, ktory sposobi zatvorenie kalkulacky
		 */
		function closeCalculator() {
			emit('close-calculator')
		}

		return {
			state,
			calculate,
			resetForm,
			closeCalculator
		}
	}
}
</script>

<style lang="css" scoped>
.calc-modal {
	position: fixed;
	width: 100vw;
	height: 100vh;
	transition: all 0.2s ease-in-out;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
}

.calc-modal-bg {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100%;
}

.calc-modal-container {
	background-color: white;
	position: relative;
	padding: 2rem;
	border-radius: 15px;
}

.calc-modal-open {
	visibility: visible;
	opacity: 1;
}

.calc-input {
	display: flex;
	flex-flow: column;
	margin: 1rem 0;
}

.calc-input input,
.calc-input select {
	padding: 0.4rem;
	border-radius: 15px;
	border: 1px solid #555;
}

form button {
	margin: 0 auto;
	display: block;
	padding: 0.8rem;
	border-radius: 15px;
	background-color: #d65db1;
	color: white;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
}

form button:hover {
	background-color: #fc6dd0;
}

.total-price {
	margin-bottom: 0;
}

@media screen and (max-width: 400px) {
	.calc-modal-container {
		width: 95%;
		padding: 1rem;
	}
}
</style>
