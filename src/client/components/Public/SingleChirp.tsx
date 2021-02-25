import moment from 'moment';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Chirp } from '../../../common/types';
import apiService from '../../utils/api-service';


const singleChirp = (props: singleChirpProps) => {
    const history = useHistory();
    const {id} = useParams<{id: string}>();
    const [chirp, setSingleChirp] = useState<Chirp>(null);

    //fetch api data for a single chirp
    useEffect(() => {
        apiService(`/api/chirps/${id}`)
        .then(chirp => setSingleChirp(chirp[0]))
    }, [id]);


    //return card html to display chirp data
    return (
        <div key={chirp?.id} className="container" id="card">
        <div className="row">
            <div className="card col-12 border border-dark mb-4">
                <div className="card-text mt-3">@{chirp?.name} from {chirp?.location} chirps...</div>
                <div className="card-body">
                    <p className="card-text" id="cardBody">{chirp?.content}</p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className="card-text text-muted">Last updated {moment(chirp?._created).startOf('minute').fromNow()} at {moment(chirp?._created).format('h:mm a')}</p>
                    <button id="button" type="button" className="btn mb-2" onClick={() => history.goBack()}> Go Back</button>
                </div>
            </div>
        </div>
    </div>
    )
}

interface singleChirpProps {}

export default singleChirp;