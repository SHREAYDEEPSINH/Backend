
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Todolist() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todoData, setTodoData] = useState({ todoName: "" });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [lsData, setLsData] = useState(
    JSON.parse(localStorage.getItem("loginuser")) || {}
  );

  useEffect(() => {
    if (!lsData.token) {
      alert("You must log in to view your todos!");
      navigate("/login");
      return;
    }

    const config = {
      headers: {
        authorization: `Bearer ${lsData.token}`,
      },
    };

    axios
      .get("http://localhost:9030/todo", config)
      .then((res) => {
        setTodos(res.data.todos);
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  }, [lsData.token, navigate]);

  const submitToDoHandler = (e) => {
    e.preventDefault();

    if (!lsData.token) {
      alert("You must log in to add todos!");
      navigate("/login");
      return;
    }

    const config = {
      headers: {
        authorization: `Bearer ${lsData.token}`,
      },
    };

    if (editMode) {
      // Edit Todo
      axios
        .put(`http://localhost:9030/todo/editTodo/${editId}`, { todoName: todoData.todoName }, config)
        .then((res) => {
          setTodos(
            todos.map((todo) =>
              todo._id === editId ? { ...todo, todoName: todoData.todoName } : todo
            )
          );
          setEditMode(false);
          setEditId(null);
          setTodoData({ todoName: "" });
          alert("Todo updated successfully!");
        })
        .catch((err) => {
          console.error(err.response?.data || err.message);
        });
    } else {
      // Add Todo
      axios
        .post(
          "http://localhost:9030/todo/addTodo",
          { todoName: todoData.todoName },
          config
        )
        .then((res) => {
          setTodos([...todos, res.data.newTodo]);
          setTodoData({ todoName: "" });
        })
        .catch((err) => {
          console.error(err.response?.data || err.message);
        });
    }
  };

  const deleteTodoHandler = (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${lsData.token}`,
      },
    };

    axios
      .delete(`http://localhost:9030/todo/deleteTodo/${id}`, config)
      .then((res) => {
        setTodos(todos.filter((todo) => todo._id !== id));
        alert("Todo deleted successfully!");
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
      });
  };

  const editTodoHandler = (id, currentName) => {
    setEditMode(true);
    setEditId(id);
    setTodoData({ todoName: currentName });
  };

  const logoutHandler = () => {
    localStorage.removeItem("loginuser");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2>Your Todos</h2>
        <button className="btn btn-danger" onClick={logoutHandler}>
          Logout
        </button>
      </div>
      <form onSubmit={submitToDoHandler} className="mt-3">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a new todo"
            value={todoData.todoName}
            onChange={(e) => setTodoData({ todoName: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-info">
          {editMode ? "Update Todo" : "Add Todo"}
        </button>
      </form>
      <ul className="list-group mt-4">
        {todos.map((todo) => (
          <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
            {todo.todoName}
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => editTodoHandler(todo._id, todo.todoName)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTodoHandler(todo._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;

