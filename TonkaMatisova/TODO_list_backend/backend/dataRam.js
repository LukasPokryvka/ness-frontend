const Joi = require('joi');

class Todos {

    constructor() {
        this.todos = [{
                "id": 1,
                "itemTitle": "Don't Panik",
                "isComplete": true
            },
            {
                "id": 2,
                "itemTitle": "Edit Meeting",
                "isComplete": false
            },
            {
                "id": 3,
                "itemTitle": "Go Over 96Ages",
                "isComplete": false
            }
        ];
    }

    nextID = (function() {
        let lastID = 3; // we start from last ID in initial Array
        return function() { lastID++; return lastID; }
    })();

    getAllTodos() { return this.todos }

    getTodo(idTodo) {
        return this.todos.find(todo => todo["id"] === idTodo);
    }

    isValidTodo(todo) {

        const todoSchema = Joi.object({
            itemTitle: Joi.string().required().min(4).max(28),
            isComplete: Joi.boolean()
        })

        return todoSchema.validate(todo).error ? false : true;
    }

    addTodo(todo) {
        if (!this.isValidTodo(todo)) {
            return null;
        }

        const newTodo = {
            "id": this.nextID(),
            "itemTitle": todo["itemTitle"],
            "isComplete": false
        };
        this.todos.push(newTodo);
        return newTodo;
    }

    updateTodo(idTodo, todo) {
        if (!this.isValidTodo(todo)) {
            return null;
        }

        const updatedTodo = this.getTodo(idTodo);
        updatedTodo["itemTitle"] = todo["itemTitle"];
        if (todo["isComplete"]) {
            updatedTodo["isComplete"] = todo["isComplete"]
        }

        return updatedTodo;
    }

    deleteTodo(idTodo) {
        const idxTodo = this.todos.findIndex(todo => todo["id"] === idTodo);
        // todo with entered ID is not in list
        if (idxTodo === -1) {
            return null;
        }

        return this.todos.splice(idxTodo, 1)[0];
    }
}

const todos = new Todos();
module.exports = todos;
