const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let todos = [];
let ids = 0;

class Todo {
    constructor(description) {
        this.id = ids++;
        this.description = description;
        this.completed = false;
        this.completedDate = null;
        this.createdDate = new Date();
    }
}

app.use(bodyParser.json());
app.use(cors());

function getTodos(request, response) {
    response.json(todos);
}

function getTodo(request, response) {
    let id = parseInt(request.params.id);
    let todo = todos.find(all => all.id === id);
    response.json(todo);
}

function createTodo(request, response) {
    let description = request.body.description;

    let todo = new Todo(description);
    todos.push(todo);

    response.json(todo);
}

function deleteTodo(request, response) {
    let id = parseInt(request.params.id);

    let index = todos.findIndex(all => all.id === id);
    let todo = todos[index];
    todos.splice(index, 1);

    response.json(todo);
}

function handleCompleted(request, response) {
    let id = parseInt(request.params.id);
    let completed = request.body.completed;
    let completedDate = request.body.completedDate;

    let todo = todos.find(all => all.id === id);
    todo.completed = completed;
    todo.completedDate = completedDate;

    response.json(todo);
}

app.get('/todos', getTodos);
app.get('/todo/:id', getTodo);
app.put('/todo', createTodo);
app.delete('/todo/:id', deleteTodo);
app.post('/todo/:id', handleCompleted);

app.listen(8000, () => {
    console.log("Listening on port 8000.");
});