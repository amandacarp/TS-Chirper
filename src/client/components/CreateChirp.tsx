import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';


export interface createChirpProps extends RouteComponentProps<{ id: string }> { };

const CreateChirp: React.FC<createChirpProps> = ({ history, match: { params: { id } } }) => {


    return (
        <div className="container">
            <div className="form-group">
                <label id="usernameLabel">Enter your Username</label>
                <input type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label id="chirpLabel">What Would You Like to Chirp?</label>
                <textarea rows="3" className="form-control"></textarea>
            </div>
            <button id="createButton" type="button" className="btn mr-4">Post your Chirp</button>
            <button id="createButton" type="button" className="btn" onClick={() => history.goBack()}> Go Back</button>
        </div>
    )
}

export default CreateChirp;