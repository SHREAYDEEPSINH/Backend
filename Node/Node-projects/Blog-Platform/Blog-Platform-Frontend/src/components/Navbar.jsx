import React from 'react'
import { Link, useNavigate } from 'react-router'

function Navbar() {
    let logout = () => {
        localStorage.removeItem("loginuser")
    }
    return (
        <>
            <nav className="navbar navbar-expand bg-transparent">
                <div className="container d-flex  align-items-centr">
                    <a className="navbar-brand" href="#"><h2 className='m-0'><strong className='text-success fs-1'>S</strong>HORT<strong className='text-success fs-1'>B</strong>LOG</h2></a>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="collapse navbar-collapse flex-grow-0 z-1 bg-white" id="navbarSupportedContent">
                        {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0"> */}
                        {/* <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/login">Login</Link>
                            </li> */}
                        {/* <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login" aria-current="page" onClick={logout}>Logout</Link>
                            </li> */}



                        <div className="dropdown">
                            {/* <button className="btn" type="button" > */}
                            <i className="bi bi-person-badge fs-2 text-success" data-bs-toggle="dropdown" aria-expanded="false"></i>
                            {/* </button> */}
                            <ul className="dropdown-menu dropdown-menu-end border-0 text-center w-auto">
                                <li><Link className="dropdown-item px-0" to="/login">Login</Link></li>
                                <li><Link className="dropdown-item px-0" to="/register">Register</Link></li>
                                <li><Link className="dropdown-item px-0" to="/login" onClick={logout}>Login</Link></li>
                            </ul>
                        </div>

                        {/* <div className="dropdown">
                            <button className="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <li><i className="bi bi-person-badge fs-2 text-success"></i></li>
                            </button>
                            <ul className="dropdown-menu dropdown-width dropdown-menu-end p-1 bg-black bg-opacity-25">
                                <li><Link to="/login" className='dropdown-item rounded-2 text-decoration-none text-dark z-1'>LogIn</Link></li>
                                <li><Link to="/login" onClick={logout} className='dropdown-item rounded-2  text-decoration-none text-dark'>Logout</Link></li>
                            </ul>
                        </div> */}

                        {/* </ul> */}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar