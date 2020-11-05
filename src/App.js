import React, { useState } from "react";
import "./App.css";
import Todo from "./Todo";
import history from "@syncstate/history";
import { useDoc } from "@syncstate/react";
function App() {
  const todoPath = "/todos";
  const [todos, setTodos, dispatch] = useDoc(todoPath);
  const [input, setInput] = useState("");

  const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);

  const addTodo = (todoItem) => {
    setTodos((todos) => {
      let id = keyGenerator();
      todos.push({
        id: id,
        caption: todoItem,
        completed: false,
      });
      document.getElementsByClassName("input-todo")[0].value = "";
    });
  };

  const todoList = todos.map((todo, index) => {
    return <Todo key={index} todoPath={todoPath + "/" + index} />;
  });
  return (
    // <div className="App">
    //   <h1>Multi-User Todo App With Redo/Undo</h1>
    //   <form
    //     onSubmit={(e) => {
    //       e.preventDefault();
    //       addTodo(input);
    //       setInput("");
    //     }}
    //   >
    //     <input
    //       type="text"
    //       className="input-todo"
    //       placeholder="What's on your mind?"
    //       onChange={(e) => {
    //         setInput(e.target.value);
    //       }}
    //     ></input>
    //     <input type="submit" value="Submit"></input>
    //   </form>
    //   {todoList}
    //   <button
    //     onClick={() => {
    //       dispatch(history.undo());
    //     }}
    //   >
    //     Undo
    //   </button>
    //   &nbsp;&nbsp;
    //   <button
    //     onClick={() => {
    //       dispatch(history.redo());
    //     }}
    //   >
    //     Redo
    //   </button>
    // </div>
    <div className="main-app">
      <div className="todo-app">
        <h2>Multi User Todo App Undo/Redo</h2>
        <br></br>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo(input);
            setInput("");
          }}
        >
          <input
            type="text"
            className="input-todo"
            placeholder="What's on your mind?"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
        </form>
        {todoList}
        <br></br>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            dispatch(history.undo());
          }}
        >
          Undo
        </button>
        &nbsp;&nbsp;
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            dispatch(history.redo());
          }}
        >
          Redo
        </button>
      </div>
    </div>
  );
}

export default App;
