import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import history from "@syncstate/history";
import { useDoc } from "@syncstate/react";
function App() {
  const todoPath = "/todos";
  const [todos, setTodos, dispatch] = useDoc(todoPath);
  const [input, setInput] = useState("");

  const addTodo = (todoItem) => {
    setTodos((todos) => {
      let id = uuidv4();
      todos.push({
        id: id,
        caption: todoItem,
        completed: false,
      });
    });
  };

  const todoList = todos.map((todo, index) => {
    return <Todo key={todo.id} todoPath={todoPath + "/" + index} />;
  });
  return (
    <div className="App">
      <h1>Multi-User Todo App With Redo/Undo</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(input);
          setInput("");
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
      {todoList}
      <button
        onClick={() => {
          dispatch(history.undo());
        }}
      >
        Undo
      </button>
      &nbsp;&nbsp;
      <button
        onClick={() => {
          dispatch(history.redo());
        }}
      >
        Redo
      </button>
    </div>
  );
}

export default App;
