import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';


export interface createChirpProps extends RouteComponentProps<{ id: string }> { };

const CreateChirp: React.FC<createChirpProps> = ({ history }) => {

    const [user, setUser] = useState('')
    const [msg, setMessage] = useState('')

    const createChirp = async () => {
        const r = await fetch ('/api/chirps', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                user, 
                msg
            })
        })
        .then(() => {history.push('/')})
    }


    return (
        <div className="container">
            <div className="form-group">
                <label id="usernameLabel">Enter your Username</label>
                <input id="username" type="text" className="form-control" onChange={event => setUser(event.target.value)} />
            </div>
            <div className="form-group">
                <label id="chirpLabel">What Would You Like to Chirp?</label>
                <textarea rows="3" className="form-control" onChange={event => setMessage(event.target.value)}></textarea>
            </div>
            <button id="createButton" type="button" className="btn mr-4" onClick={() => createChirp()}>Post your Chirp</button>
            <button id="createButton" type="button" className="btn" onClick={() => history.goBack()}> Go Back</button>
        </div>
    )
}

export default CreateChirp;