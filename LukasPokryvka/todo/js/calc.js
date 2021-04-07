const openCalcButton = document.getElementById('openCalcButton')
const calcOverlay = document.querySelector('.calc-modal')
const calcExit = document.querySelector('.calc-modal-exit')
const form = document.getElementById('calcForm')

// pridanie eventov
const addEventsCalc = () => {
	openCalcButton.addEventListener('click', openCalc)

	calcExit.addEventListener('click', closeCalc)

	form.addEventListener('submit', (e) => {
		e.preventDefault()
		const price = document.getElementById('price')
		const satis = document.getElementById('satis')
		const people = document.getElementById('people')
		calcTotal(price.value, satis.value, people.value)
		price.value = ''
		people.value = ''
	})
}

// otvorenie kalkulacky po kliknuti na button
const openCalc = () => {
	calcOverlay.classList.add('calc-modal-open')
}

// zatvorenie kalkulacky po kliknuti mimo kalkulacky
const closeCalc = () => {
	calcOverlay.classList.remove('calc-modal-open')
}

// vypocitanie konecnej sumy, vypisanie
const calcTotal = (price, satis, people) => {
	console.log(price, satis, people)
	const totalPrice = ((price * satis) / people).toFixed(2)
	document.querySelector(
		'.total-price'
	).textContent = `You should pay: ${totalPrice}€`
}

// priradenie eventov elementom
addEventsCalc()
