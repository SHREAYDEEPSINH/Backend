
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

function Register() {
    const navigate = useNavigate();
    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function submitHandler(e) {
        e.preventDefault();

        if (!register.name || !register.email || !register.password) {
            setError("All fields are required!");
            return;
        }

        axios
            .post("http://localhost:9030/user/register", register)
            .then((res) => {
                setSuccess("Registration successful!");
                navigate("/login"); // Redirect to login page after success
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Registration failed!");
                setSuccess("");
            });
    }

    return (
        <div className="container mt-5">
            <form className="w-50 m-auto" onSubmit={submitHandler}>
                <h1 className="text-center">Register</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="name"
                        value={register.name}
                        onChange={(e) =>
                            setRegister({ ...register, name: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        value={register.email}
                        onChange={(e) =>
                            setRegister({ ...register, email: e.target.value })
                        }
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        value={register.password}
                        onChange={(e) =>
                            setRegister({ ...register, password: e.target.value })
                        }
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
            <div className="text-center mt-3">
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
}

export default Register;
