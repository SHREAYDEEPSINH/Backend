

import axios from "axios";
import React, { useEffect, useState } from "react";

function Todolist() {
    const [todos, setTodos] = useState([]);
    const [todoData, setTodoData] = useState({ todoName: "" });
    const [lsData, setLsData] = useState(JSON.parse(localStorage.getItem("loginuser")) || {});

    // Fetch todos on component mount
    useEffect(() => {
        if (!lsData.token) {
            console.error("User not logged in");
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
                console.log(res.data, "Fetched todos");
                setTodos(res.data.todos);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [lsData.token]);

    const submitToDoHandler = (e) => {
        e.preventDefault();

        if (!lsData.token) {
            console.error("User not logged in");
            return;
        }

        const config = {
            headers: {
                authorization: `Bearer ${lsData.token}`,
            },
        };

        axios
            .post(
                "http://localhost:9030/todo/addTodo",
                { todoName: todoData.todoName }, // Pass the todo name
                config
            )
            .then((res) => {
                console.log(res.data, "Todo added");
                setTodos([...todos, res.data.newTodo]); // Update state with new todo
                setTodoData({ todoName: "" }); // Clear input field
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="border border-2 border-info w-100 m-auto p-2 rounded-3">
            <h2 className="text-center py-2 text-info">Todolist</h2>

            {/* Add Todo Form */}
            <form onSubmit={submitToDoHandler}>
                <input
                    type="text"
                    value={todoData.todoName}
                    onChange={(e) => setTodoData({ todoName: e.target.value })}
                    placeholder="Enter todo"
                    className="form-control"
                />
                <button type="submit" className="btn btn-info mt-2">
                    Add
                </button>
            </form>

            {/* Display Todos */}
            <div className="mt-4">
                <ul className="list-group">
                    {todos.map((todo) => (
                        <li key={todo._id} className="list-group-item">
                            {todo.todoName}
                        </li>
                    ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Todolist;
