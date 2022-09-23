const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Todo = require('./data');
const db = require('./db');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(cors());

async function getTodos(request, response) {
    const query = "SELECT * FROM todos";
    let res = await db.pool.query(query);
    response.json(res.rows.map(Todo.convert));
}

async function getTodo(request, response) {
    let id = parseInt(request.params.id);
    const query = "SELECT * FROM todos WHERE id = $1::INT";
    const values = [id];
    let res = await db.pool.query(query, values);
    response.json(Todo.convert(res.rows[0]));
}

async function createTodo(request, response) {
    let description = request.body.description;

    let todo = new Todo(description);
    
    const query = "INSERT INTO todos (description, completed, completedDate, createdDate) VALUES ($1::TEXT, $2::BOOLEAN, $3::TEXT, $4::TEXT)";
    const values = [todo.description, todo.completed, todo.completedDate, todo.createdDate];
    let res = await db.pool.query(query, values);

    response.json(todo);
}

async function deleteTodo(request, response) {
    let id = parseInt(request.params.id);

    const query = "DELETE FROM todos WHERE id = $1::INT";
    const values = [id];
    let res = await db.pool.query(query, values);

    response.json({ success: true, deletedCount: res.rowCount });
}

async function handleCompleted(request, response) {
    let id = parseInt(request.params.id);
    let completed = request.body.completed;
    let completedDate = request.body.completedDate;

    const query = "UPDATE todos SET completed = $1::BOOLEAN, completedDate = $2::TEXT WHERE id = $3::INT";
    const values = [completed, completedDate, id];
    let res = await db.pool.query(query, values);

    await getTodo(request, response);
}

app.get('/todos', getTodos);
app.get('/todo/:id', getTodo);
app.put('/todo', createTodo);
app.delete('/todo/:id', deleteTodo);
app.post('/todo/:id', handleCompleted);

app.listen(8000, () => {
    console.log("Listening on port 8000.");
});