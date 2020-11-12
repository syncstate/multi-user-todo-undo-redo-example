import React from "react";
import "./App.css";
import { useDoc } from "@syncstate/react";
function Todo(props) {
  const { todoPath } = props;
  const [todos, setTodos] = useDoc("/todos", Infinity);
  const [todoItem, setTodoItem] = useDoc(todoPath);

  const deleteTodo = (id) => {
    let newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  };

  const toggleTodo = (completed) => {
    setTodoItem((todoItem) => {
      todoItem.completed = completed;
    });
  };

  return (
    <div className="todo-list-item">
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
            toggleTodo(e.target.checked);
          }}
        ></input>
      )}

      <div>{todoItem.caption}</div>

      <span
        onClick={() => {
          deleteTodo(todoItem.id);
        }}
      >
        X
      </span>
    </div>
  );
}

export default Todo;
