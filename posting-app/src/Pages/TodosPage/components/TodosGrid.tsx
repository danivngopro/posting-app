import React, { useState } from "react";
import ITodo from "../../../interfaces/ITodo";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface Props {
  todos: ITodo[];
}

export default function TodosGrid({ todos }: Props) {
  const [value, setValue] = useState<ITodo | null>(null);
  return (
    <div>
      <Autocomplete
      options={todos}
      getOptionLabel={(option: ITodo) => option.title}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a task"
          variant="outlined"
        />
      )}
    />
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
