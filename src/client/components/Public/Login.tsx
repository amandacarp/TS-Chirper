import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiService, { setStorage } from '../../utils/api-service';
import { IFormState } from './Register';

const Login = (props: LoginProps) => {
    const history = useHistory<{ history: string }>()
    const [values, setValues] = useState<IFormState>({});

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value }));
    }

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            Swal.fire({
                title: `Error`,
                icon: 'error',
                text: 'Please fill out all the required fields',
            })
        } else {
            const token = await apiService('/auth/login', 'POST', values)
            if (token) {
                setStorage(token)
                history.push('/chirp/profile')
            } else {
                Swal.fire({
                    title: 'Invalid!',
                    text: `Incorrect Email or Password. Please try again!`,
                    icon: 'error',
                })
            } window.location.reload(true);
            //  look up history.listen
        }
    };

    return (
        <>
            <div className="row justify-content-start">
                <h4 className="border-bottom border-dark m-4" id="welcome">Welcome, please login below...</h4>
            </div>
            <div className="row justify-content-center m-4">
                <div className="col-md-4">

                    <div className="form-group mt-2">

                        <label className="mt-3" id="label">Email Address</label>
                        <input type="text" className="form-control textArea border-dark" name="email" value={values.email || ''} onChange={handleChanges} required />

                        <label className="mt-3" id="label">Password</label>
                        <input type="password" className="form-control textArea border-dark" name="password" value={values.password || ''} onChange={handleChanges} required />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
            
            
        </>
    )

}


interface LoginProps { }

export default Login;