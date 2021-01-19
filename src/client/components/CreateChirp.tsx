import * as React from 'react';

const CreateChirp: React.FC = (props) => {
    return (

        <>
            <div className="form-group">
                <label id="usernameLabel">Enter your Username</label>
                <input type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label id="chirpLabel">What Would You Like to Chirp?</label>
                <textarea rows="3" className="form-control"></textarea>            
                </div>
                <button onClick={() => } id="createButton" type="button" className="btn">Post your Chirp</button>
        </>

    ) 
}

export default CreateChirp;