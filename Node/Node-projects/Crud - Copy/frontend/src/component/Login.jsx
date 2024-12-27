import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Login() {

    const [login , setLogin] = useState({
        email : "",
        password : ""
    }) 

    const [loginUser , setLoginUser] = useState( JSON.parse(localStorage.getItem("loginuser")) || [])

    useEffect(()=>{
        localStorage.setItem("loginuser" , JSON.stringify(loginUser))
    },[loginUser])

    
    const loginSubmitHendler = (e) =>{
        e.preventDefault()

        axios.post("http://localhost:9030/user/login" ,login)
        .then((res) => {
            console.log(res.data, "login")
            setLoginUser(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }


  return (
    <div>
            <form className='w-50 m-auto' onSubmit={loginSubmitHendler}>
                <h1>Login Page</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail" name='email' aria-describedby="emailHelp" value={login.email} onChange={(e)=> setLogin({...login , email : e.target.value})}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={login.password}  onChange={(e)=> setLogin({...login , password : e.target.value})} name='password' id="exampleInputPassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}

export default Login