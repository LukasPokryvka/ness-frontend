const express = require('express')
const app = express()
const db = require('./db/todos')
app.use(express.json())
app.use(express.urlencoded())
const port = 3000

// povolenie CORS policies
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
	res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

// post, ak je uspesny, vracia id vlozeneho todo
app.post('/todos', async (req, res) => {
	const results = await db.createTodo(req.body)
	res.status(200).json({ id: results[0] })
})

// GET
app.get('/todos', async (req, res) => {
	const todos = await db.getAllTodos(req.body)
	res.status(200).json({ todos })
})

// PATCH
app.patch('/todos/:id', async (req, res) => {
	const id = await db.updateTodo(req.params.id, req.body)
	res.status(200).json({ id })
})

// DELETE
app.delete('/todos/:id', async (req, res) => {
	await db.deleteTodo(req.params.id)
	res.status(200).json({ success: true })
})

app.listen(port, () => console.log('server is running'))
