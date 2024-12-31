import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Register() {

    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: ""
    })

    function submitHandeler(e) {
        e.preventDefault()

        axios.post("http://localhost:9030/user/register", register)
            .then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <form className='w-50 m-auto' onSubmit={submitHandeler}>
                <h1>Register Page</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" aria-label="name" name='name' value={register.name} onChange={(e) => setRegister({...register , name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" value={register.email} onChange={(e) => setRegister({...register , email: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={register.password} name='password' onChange={(e) => setRegister({...register , password: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register