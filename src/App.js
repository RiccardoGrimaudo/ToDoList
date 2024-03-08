import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import TodoList from "./components/ToDoList.js";

import axios from "axios";    // libreria axios per effettuare richieste HTTP a un API esterna

function App() {
  const [todos, setTodos] = useState(null);

  const onUpdateTodo = (todo) => {
    const todoItemIndex = todos.findIndex((x) => x.id == todo.id);
    const newTodos = [...todos];

    const newTodo = newTodos[todoItemIndex];
    newTodo.completed = !newTodo.completed;
    newTodos[todoItemIndex] = newTodo;
    setTodos(newTodos);
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((result) => {
      setTodos(result.data);
    });
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      {todos ? (
        <TodoList todos={todos} onUpdateTodo={onUpdateTodo} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;