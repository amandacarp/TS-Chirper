import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Chirps, { IChirp } from './Chirps'

export interface singlechirpProps extends RouteComponentProps<{ id: string }> { };

const singleChirp: React.FC<singlechirpProps> = ({ history, match: { params: { id } } }) => {
    const [chirp, setsingleChirp] = useState<IChirp>({
        id: null,
        user: null,
        msg: null
    });

    const getsingleChirp = async () => {
        let r = await fetch(`/api/chirps/${id}`);
        let singleChirp = await r.json();
        setsingleChirp(singleChirp);
    };

    useEffect(() => {
        getsingleChirp();
    }, [id])

    const deleteChirp = async () => {
        const res = await fetch(`/api/chirps/${id}`, {
            method: 'delete'
        });
        return await res.json();
    }

    return (
        <div className="container">
            <div className="form-group">
                <label id="usernameLabel">Edit your Username</label>
                <input type="text" className="form-control" placeholder={chirp.user} />
            </div>
            <div className="form-group">
                <label id="chirpLabel">What Would You Like to Edit?</label>
                <textarea rows="3" className="form-control" placeholder={chirp.msg}></textarea>
            </div>
            <button id="chirpButton" className="btn-sm mr-4"> Save Edit</button>
            <button id="chirpButton" className="btn-sm mr-4" onClick={() => deleteChirp()}> Delete Chirp</button>
            <button id="chirpButton" className="btn-sm" onClick={() => history.goBack()}> Go Back</button>
        </div>
    )
}

export default singleChirp;