import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';


export interface createChirpProps extends RouteComponentProps<{ id: string }> { };

const CreateChirp: React.FC<createChirpProps> = ({ history }) => {

    const [location, setLocation] = useState('')
    const [content, setContent] = useState('')

    const createChirp = async () => {
        const r = await fetch ('/api/chirps', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                content, 
                location,
            })
        })
        .then(() => {history.push('/')})
        .catch(err => {
            alert('Error: Could Not Post Chirp');
            console.log(err)
        })
    }


    return (
        <div className="container">
            <div className="form-group">
                <label id="usernameLabel">Enter your Location</label>
                <input id="username" type="text" className="form-control" onChange={event => setLocation(event.target.value)} />
            </div>
            <div className="form-group">
                <label id="chirpLabel">What Would You Like to Chirp?</label>
                <textarea rows="3" className="form-control" onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <button id="createButton" type="button" className="btn mr-4" onClick={() => createChirp()}>Post your Chirp</button>
            <button id="createButton" type="button" className="btn" onClick={() => history.goBack()}> Go Back</button>
        </div>
    )
}

export default CreateChirp;