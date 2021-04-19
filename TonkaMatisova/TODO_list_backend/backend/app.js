const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const moduleTodos = require("./moduleTodos");
app.use(moduleTodos);

const moduleTodoId = require("./moduleTodoId");
app.use(moduleTodoId);

app.listen(3005, () => console.log("Server is running"));