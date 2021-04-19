const express = require("express");

const HTTPResponseStatusCodes = require("./HTTPResponseStatusCodes");
const todos = require('./dataRam');

const routerTodos = express.Router();
routerTodos.route("/todos")
    // Lists all TODOs in TODO list
    .get(async(req, res) => {
        res.send(todos.getAllTodos());
    })
    // Create new todo
    .post(async(req, res) => {
        const todo = todos.addTodo(req.body);
        if (todo) {
            res.send(todo);
        } else {
            res.status(HTTPResponseStatusCodes.METHOD_NOT_ALLOWED)
                .send("New todo not valid");
        }
    })

module.exports = routerTodos;