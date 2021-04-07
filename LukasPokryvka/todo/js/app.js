// odchytenie klucovych elementov
const todoInput = document.getElementById('todoValue')
const todoButton = document.getElementById('addButton')
const todoList = document.getElementById('todos')

// pridanie eventov pre input po stlaceni enter,
// button na pridanie itemu a button pre odstranenie
const addEvents = () => {
	todoInput.addEventListener('keyup', (e) => {
		if (e.key === 'Enter') {
			addTodo()
		}
	})

	todoButton.addEventListener('click', addTodo)

	todoList.addEventListener('click', (e) => deleteOrDone(e))
}

// pridanie noveho itemu
const addTodo = () => {
	const inputValue = document.getElementById('todoValue')
	// validacia inputu
	if (/^.{1,20}$/.test(inputValue.value.trim())) {
		const ul = document.getElementById('todos')
		const li = document.createElement('li')
		li.innerHTML = `${inputValue.value}<button class="delItem">X</button>`
		ul.appendChild(li)
		inputValue.value = ''
	}
}

// rozhodovanie, ci chce user vymazat item,
// alebo oznacit ako done
const deleteOrDone = (e) => {
	e.target.className === 'delItem' ? deleteTodo(e) : doneTodo(e)
}

// odstranenie itemu
const deleteTodo = (e) => {
	if (e.target.className === 'delItem') {
		const liToDel = e.target.parentNode
		const parentUl = liToDel.parentNode
		parentUl.removeChild(liToDel)
	}
}

// po kliknuti na li item sa oznaci ako done
const doneTodo = (e) => {
	if (e.target.nodeName === 'LI') {
		e.target.classList.toggle('done')
	}
}

// priradenie eventov elementom
addEvents()
