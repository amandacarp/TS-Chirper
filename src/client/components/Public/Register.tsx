import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiService, { setStorage } from '../../utils/api-service';

const Register = (props: RegisterProps) => {
    const history = useHistory<{ history: string }>()
    const [values, setValues] = useState<IFormState>({});

    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };


    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!values.email || !values.name || !values.password) {
            Swal.fire({
                title: `Error`,
                icon: 'error',
                text: 'Please fill out all the required fields',
            })
        } else {
            const token = await apiService('/auth/register', 'POST', values)
            setStorage(token)
            history.push('/chirp/profile')
            window.location.reload(true);
        }
    };


    return (
        <>

            <div className="row justify-content-start">
                <h4 className="border-bottom border-dark m-4" id="welcome">Welcome, please register below...</h4>
            </div>
            <div className="row justify-content-center m-4">
                <div className="col-md-4">

                    <div className="form-group mt-2">
                        <label className="mt-3" id="label">Name</label>
                        <input type="text" className="form-control textArea border-dark" name="name" value={values.name || ''} onChange={handleChanges} required />

                        <label className="mt-3" id="label">Email Address</label>
                        <input type="text" className="form-control textArea border-dark" name="email" value={values.email || ''} onChange={handleChanges} required />

                        <label className="mt-3" id="label">Password</label>
                        <input type="password" className="form-control textArea border-dark" name="password" value={values.password || ''} onChange={handleChanges} required />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button id="button" type="button" className="btn shadow mt-2 mx-4" onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>


        </>
    )
}

export interface IFormState {
    email?: string;
    password?: string;
    name?: string;
}

interface RegisterProps { }

export default Register;