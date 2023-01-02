import React, { useState } from "react";
import ITodo from "../../../interfaces/ITodo";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { markTodoCompleted } from "../../../services/todosServices";

interface Props {
  todos: ITodo[];
}

export default function TodosGrid({ todos }: Props) {
  const [value, setValue] = useState<ITodo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>(todos);

  const handleChnage = (newValue: string) => {
    setFilteredTodos(todos.filter((todo) => todo.title.includes(newValue)));
  };

  const handleCompleteTask = async (task: ITodo) => {
    const tempTask = await markTodoCompleted(task);
    setFilteredTodos(
      filteredTodos.map((todo) => {
        if (todo.title === tempTask.title) {
          todo.completed = tempTask.completed;
        }
        return todo;
      })
    );
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <div className="d-flex justify-content-center mb-4">
        <Autocomplete
          sx={{ width: "500px" }}
          options={todos}
          getOptionLabel={(option: ITodo) => option.title}
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          onInputChange={(event, newValue) => {
            handleChnage(newValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Choose a task" variant="outlined" />
          )}
        />
      </div>
      <div className="row">
        {filteredTodos.map((todo, index) => {
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
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => {
                      handleCompleteTask(todo);
                    }}
                  >
                    complete task
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
