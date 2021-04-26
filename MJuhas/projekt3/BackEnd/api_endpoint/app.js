const express = require("express")
const app = express()
const port = 3001
const Joi = require('joi'); // create joi schceme
const cors = require('cors');

app.use(cors())

const fs = require('fs'); // read from files
var jsonData = fs.readFileSync('database.json');
var database = JSON.parse(jsonData);

//const bp = require('body-parser') // body parser and read from body via via JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// request function
app.get("/", (req, res) => {
    res.send(database)
})

app.post("/", (req, res) => { // post  create a new task

    if (isValidTask(req.body)) {

        let newTask = {...req.body, "id": Math.max(...database.map(item => item.id)) + 1 }
        database.push(newTask)
        fs.writeFileSync('database.json', (JSON.stringify(database)));
        res.status(200)
            .send(database)

    } else {
        res.status(405)
            .send("New task not valid")
    }
})

.put("/:id", (req, res) => { // put  upgrate a task

    let searchId = database.findIndex(item => item.id == req.params.id)

    if (!/^[0-9]+$/.test(req.params.id)) {
        res.status(400)
            .send(" Invalid ID format supplied")
    } else if (searchId == -1) {
        res.status(404)
            .send("Task not found")
    }

    if (isValidTask(req.body)) {
        Object.assign(database[searchId], {...req.body, "id": req.params.id })
        fs.writeFileSync('database.json', (JSON.stringify(database)));
        res.status(200)
            .send(database[searchId])
    } else {
        res.status(405)
            .send("Update task not valid", req.body)

    }
})

app.delete("/:id", (req, res) => {

    let searchId = database.findIndex(item => item.id == req.params.id)

    if (!/^[0-9]+$/.test(req.params.id)) {
        res.status(400)
            .send(" Invalid ID format supplied")
    } else if (searchId > -1) {
        let deleteTask = database[searchId]
        database.splice(searchId, 1)
        fs.writeFileSync('database.json', (JSON.stringify(database)));
        res.status(200)
            .send(deleteTask)

    } else {
        res.status(404)
            .send("Task not found")
    }

})

const isValidTask = (task) => {


    const taskSchema = Joi.object({
        title: Joi.string().required(),
        completed: Joi.boolean().required()

    })

    return taskSchema.validate(task).error ? false : true;
}

app.listen(port)