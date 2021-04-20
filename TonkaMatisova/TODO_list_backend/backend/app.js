const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const moduleTodos = require("./moduleTodos");
app.use(moduleTodos);

const moduleTodoId = require("./moduleTodoId");
app.use(moduleTodoId);

app.listen(3005, () => console.log("Server is running"));