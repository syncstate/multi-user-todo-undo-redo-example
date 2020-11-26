import React from "react";
import { useDoc } from "@syncstate/react";

function Todo({ todoPath }) {
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

  const getTxtStyle = () => {
    return {
      textDecoration: todoItem.completed ? "line-through" : "none",
      marginLeft: "10px",
    };
  };

  return (
    <div>
      <div className="d-flex align-content-center">
        <div
          className="custom-checkbox custom-control d-flex align-items-center"
          style={{ marginBottom: "2px" }}
        >
          <input
            type="checkbox"
            className="form-check-input"
            checked={todoItem.completed}
            onChange={(e) => {
              toggleTodo(e.target.checked);
            }}
          />
        </div>

        <div
          className="d-flex align-items-center todoTitle"
          style={getTxtStyle()}
        >
          <div style={{ width: "100%" }}>{todoItem.caption} </div>
        </div>
        <div className="ml-auto d-flex align-items-center">
          <button
            className="border-0 btn-transition btn btn-outline-danger"
            onClick={() => {
              deleteTodo(todoItem.id);
            }}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
