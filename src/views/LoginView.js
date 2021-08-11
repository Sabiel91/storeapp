import {useState, useEffect, useContext} from 'react'
import imgLogin from "../assets/login.jpg"
import { AuthContext } from '../context/authContext'

export default function LoginView() {
    const { signIn }  = useContext (AuthContext)


    return (
        <div className=" row" style={{height: '100vh', width: '100 vw'}}>
            <div className="col-sm-12 col-md-6">
                <img src={imgLogin} style={{width: '100%',
                height: '100%',
                objectFit:'cover',
                }} alt="imagen login" />
            </div>
            <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
               <div className="text-center">
                    <h2>Ingresa</h2>
                    <button className="btn btn-danger btn-lg" onClick={signIn}>
                        <i className="fab fa-google me-2" />
                        Ingresa con Google
                    </button>
               </div>
            </div>      
        </div>
    )
}
