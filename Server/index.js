const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

//Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

//Get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

//Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error);
  }
});

//Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const UpdateTodo = await pool.query(
      "UPDATE todo SET description =$1  WHERE id=$2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (error) {
    console.log(error);
  }
});
//Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE id=$1", [id]);
    res.json("Todo was Deleted!");
  } catch (error) {
    console.log(error);
  }
});
//Server Running on 5000
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
