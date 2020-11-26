import React, { useState } from "react";

function AddTodo({ addTodo }) {
  const [input, setInput] = useState("");

  return (
    <div
      className="d-block text-right card-footer d-flex"
      style={{ padding: "0.75rem" }}
    >
      <div className=" position-relative col " style={{ paddingLeft: "13px" }}>
        <input
          type="text"
          className="form-control input-todo" //addText
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyPress={(event) => {
            if (event.which === 13 || event.keyCode === 13) {
              addTodo(input);
              setInput("");
            }
          }}
          placeholder="Enter new todo"
        />

        <i
          className="fa fa-close"
          style={{
            position: "absolute",
            top: "25%",
            right: "25px",
          }}
          onClick={() => setInput("")}
        ></i>
      </div>
      <div className="ml-auto">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            addTodo(input);
            setInput("");
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default AddTodo;
