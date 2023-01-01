import React from "react";
import ITodo from "../../../interfaces/ITodo";

interface Props {
  todos: ITodo[];
}

export default function TodosGrid({ todos }: Props) {
  console.log(todos);
  return (
    <div>
      <div className="row">
        {todos.map((todo, index) => {
          return (
            <div
              className="col-md-3 col-sm-6 col-12 mb-4"
              key={index}
              style={{ marginLeft: "3rem", marginRight: "4.2rem" }}
            >
              <div
                className="card shadow border border-black"
                style={{ margin: "0 2px", width: "300px" }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>Todo title: </strong>
                    {todo.title}
                  </h5>
                  <div className="card-text">
                    <strong>Completed: </strong> {todo.completed + ""}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
