

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const loginSubmitHandler = (e) => {
        e.preventDefault();

        if (!login.email || !login.password) {
            setError("All fields are required!");
            return;
        }

        axios
            .post("http://localhost:9030/user/login", login)
            .then((res) => {
                localStorage.setItem("loginuser", JSON.stringify(res.data));
                setError("");
                navigate("/todolist");
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Invalid credentials!");
            });
    };

    return (
        <div className="container mt-5">
            <form className="w-50 m-auto" onSubmit={loginSubmitHandler}>
                <h1 className="text-center">Login</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        value={login.email}
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        value={login.password}
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
            <div className="text-center mt-3">
                <p>Don't have an account? <Link to="/">Register here</Link></p>
            </div>
        </div>
    );
}

export default Login;
