import * as React from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {Chirp} from '../../common/types'


export interface createChirpProps extends RouteComponentProps{ };

const CreateChirp: React.FC<createChirpProps> = ({ history }) => {

    const [location, setLocation] = useState<Chirp["location"]>('')
    const [content, setContent] = useState<Chirp["content"]>('')

    const createChirp = async () => {
        const r = await fetch('/api/chirps', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content,
                location,
            })
        })
            .then(() => { history.push('/') })
            .catch(err => {
                alert('Error: Could Not Post Chirp');
                console.log(err)
            })
    }


    return (
        <div className="container">
            <div className="form-group">
                <label id="label">Enter your Location</label>
                <input id="username" type="text" className="form-control" onChange={event => setLocation(event.target.value)} />
            </div>
            <div className="form-group">
                <label id="label">What Would You Like to Chirp?</label>
                <textarea rows="3" className="form-control" onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <button id="button" type="button" className="btn mr-4" onClick={() => createChirp()}>Post your Chirp</button>
            <button id="button" type="button" className="btn" onClick={() => history.goBack()}> Go Back</button>
        </div>
    )
}

export default CreateChirp;