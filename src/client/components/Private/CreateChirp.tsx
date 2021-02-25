import * as React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {Chirp} from '../../../common/types'
import apiService from '../../utils/api-service';

const CreateChirp = (props: createChirpProps) => {

    const history = useHistory();
    const [location, setLocation] = useState<Chirp["location"]>('')
    const [content, setContent] = useState<Chirp["content"]>('')
     
    const createChirp = async () => {
        if (!location || !content) {
            Swal.fire({
                title: `Error`,
                icon: 'error',
                text: 'Please fill out all the required fields',
            })
        } else {
        await apiService('/api/chirps', 'POST', { location, content })
            .catch(err => {
                alert('Error: Could Not Post Chirp');
                console.log(err)
            })
            .then(() => { history.push('/chirp/profile') })
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-3">
                <div className="col-md-4">
            <div className="form-group">
                <label className="mt-3" id="label">Enter your Location</label>
                <input type="text" className="form-control textArea border-dark" onChange={event => setLocation(event.target.value)} />
          
      
                <label className="mt-3" id="label">What Would You Like to Chirp?</label>
                <textarea rows={3} className="form-control textArea border-dark" onChange={event => setContent(event.target.value)}></textarea>
            </div>

            <button id="button" type="button" className="btn mr-4" onClick={() => createChirp()}>Chirp</button>
            <button id="button" type="button" className="btn" onClick={() => history.goBack()}> Go Back</button>

        </div>
        </div>
        </div>
    )
}

interface createChirpProps {}


export default CreateChirp;