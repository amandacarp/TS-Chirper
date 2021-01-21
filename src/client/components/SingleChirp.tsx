import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IChirp } from './Chirps'
import Swal from 'sweetalert2'

export interface singlechirpProps extends RouteComponentProps<{ id: string }> { };

const singleChirp: React.FC<singlechirpProps> = ({ history, match: { params: { id } } }) => {
    const [chirp, setsingleChirp] = useState<IChirp>({
        id: null,
        user: null,
        msg: null
    });

    //fetch api data for a single chirp
    const getsingleChirp = async () => {
        const r = await fetch(`/api/chirps/${id}`);
        const singleChirp = await r.json();
        setsingleChirp(singleChirp);
    };

    useEffect(() => {
        getsingleChirp();
    }, [id])

    //use fetch to delete a single chirp based on id
    const deleteChirp = async () => {
        const res = await fetch(`/api/chirps/${id}`, {
            method: 'delete'
        })
        .then(() => {
            Swal.fire({
                title: `Chirp #${id} Deleted!`,
                icon: 'success',
                timer: 1500
            })
        })
        .then(() => {history.push('/')})
        .catch(err => {
            alert('Error: Chirp not deleted');
            console.log(err)
        })
    }

    //use fetch and useState Hook to edit a chirp
    const [user, setUser] = useState('')
    const [msg, setMessage] = useState('')

    const editChirp = async () => {
        const r = await fetch (`/api/chirps/${id}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user, 
                msg
            })
        })
        .then(() => {history.push('/')})
        .catch(err => {
            alert('Error: Chirp not edited');
            console.log(err)
        })
    }

    //return card html to display chirp data
    return (
        <div className="container">
            <div className="form-group">
                <label id="usernameLabel">Edit your Username</label>
                <input type="text" className="form-control" placeholder={chirp?.user} onChange={event => setUser(event.target.value)}/>
            </div>
            <div className="form-group">
                <label id="chirpLabel">What Would You Like to Edit?</label>
                <textarea rows="3" className="form-control" placeholder={chirp?.msg} onChange={event => setMessage(event.target.value)}></textarea>
            </div>
            <button id="chirpButton" className="btn-sm mr-4" onClick={() => editChirp()}> Save Edit</button>
            <button id="chirpButton" className="btn-sm mr-4" onClick={() => deleteChirp()}> Delete Chirp</button>
            <button id="chirpButton" className="btn-sm" onClick={() => history.goBack()}> Go Back</button>
        </div>
    )
}

export default singleChirp;