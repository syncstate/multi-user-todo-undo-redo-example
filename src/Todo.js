import React, { useState } from "react";
import "./App.css";
import { useDoc } from "@syncstate/react";
function Todo(props) {
  const { todoPath } = props;
  const [todos, setTodos] = useDoc("/todos");
  const [todoItem, setTodoItem] = useDoc(todoPath);

  const deleteTodo = (id) => {
    setTodos((todos) => {
      var index;
      for (var i in todos) {
        if (todos[i].id === id) {
          index = i;
          break;
        }
      }
      todos.splice(index, 1);
    });
  };
  const toggleTodo = (completed) => {
    setTodoItem((todoItem) => {
      todoItem.completed = completed;
    });
  };

  return (
    <div className="App">
      <div>
        {todoItem.completed ? (
          <input
            type="checkbox"
            checked={true}
            onChange={(e) => {
              toggleTodo(e.target.checked);
            }}
          ></input>
        ) : (
          <input
            type="checkbox"
            onChange={(e) => {
              console.log(e.target.checked);
              toggleTodo(e.target.checked);
            }}
          ></input>
        )}

        {todoItem.caption}

        <button
          onClick={() => {
            deleteTodo(todoItem.id);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
}

export default Todo;
