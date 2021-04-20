const express = require("express");

const HTTPResponseStatusCodes = require("./HTTPResponseStatusCodes");
const todos = require('./dataRam');

const routerTodosId = express.Router();
routerTodosId.route("/todos/:id")
    // Update todo by ID
    .put(async(req, res) => {
        // test validity of ID
        if (!/^[0-9]+$/.test(req.params.id)) {
            res.status(HTTPResponseStatusCodes.BAD_REQUEST)
                .send("Invalid ID format supplied");
            return;
        }
        // test if we have todo with entered ID
        if (!todos.getTodo(+req.params.id)) {
            res.status(HTTPResponseStatusCodes.NOT_FOUND)
                .send("Todo not found");
            return;
        }
        const todo = todos.updateTodo(+req.params.id, req.body);
        if (todo) {
            res.send(todo);
        } else {
            res.status(HTTPResponseStatusCodes.METHOD_NOT_ALLOWED)
                .send("New todo not valid");
        }
    })
    // Deletes a todo
    .delete(async(req, res) => {
        // test validity of ID
        if (!/^[0-9]+$/.test(req.params.id)) {
            res.status(HTTPResponseStatusCodes.BAD_REQUEST)
                .send("Invalid ID format supplied");
            return;
        }
        // ID is valid, we check if we have todo with entered ID to delete
        const todo = todos.deleteTodo(+req.params.id);
        if (todo) {
            res.send(todo);
        } else {
            res.status(HTTPResponseStatusCodes.NOT_FOUND)
                .send("Todo not found");
        }
    })


module.exports = routerTodosId;