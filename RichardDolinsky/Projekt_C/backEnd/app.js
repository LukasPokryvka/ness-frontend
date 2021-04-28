const express = require('express');
const app = express();

const bp = require('body-parser')
const Joi = require('joi')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const cors = require('cors');
app.use(cors());


const module1 = require("./libraryList");

// console.log(module1);


//-------------GET ---------------
const routerTodo = express.Router();
const schema1 = Joi.string().min(1).uppercase()

routerTodo.route('/todo')
    .get(async (req, res) => {
        res.send(module1)
        res.status(200)
    })
    .post(async (req, res) => {
        let data =
        {
            "title": req.body.title,
            "id": module1.length
        };

        let validationTitle = schema1.validate(req.body.title)
        if (validationTitle.error) {
            res.status(405)
            res.send("Invalid TODO format");
            return;
        }
        else {
            module1.push(data)
            res.send(module1[module1.length - 1])
            res.status(200)
        }


    })

app.use(routerTodo)
const schemaInt = Joi.number().integer();

const routerTodoId = express.Router();
routerTodoId.route('/todo/:id')
    .delete(async (req, res) => {
        let validationInt = schemaInt.validate(req.params.id)
        let intId = req.params.id;

        const isHere = module1.findIndex(element => element["id"] == req.params.id); // hlada v kniznici a ak sa zhoduje idcko s hladanym tak:
        if (isHere == -1) {
            if (validationInt.error) {
                res.status(400)
                return res.send("Invalid ID format supplied")
            }
            else {

                res.status(404)
                return res.send("Todo not found")
            }
        }
        else if (isHere >= 0) {
            res.status(200)
            module1.splice(isHere, 1)
            return res.send('Todo with array-ID: ' + isHere + ' was deleted')
        }
    })
app.use(routerTodoId)

app.listen(3005, () => console.log("Server is running"));
