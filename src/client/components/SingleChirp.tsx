import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { IChirp } from './Chirps'

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

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="card col-12 mb-4" key={chirp.id}>
                        <div className="card-body">
                            <h5 id="cardTitle" className="card-title">{chirp.user}</h5>
                            <p id="cardBody" className="card-text m-4">{chirp.msg}</p>
                            <button id="goBack" className="btn-sm" onClick={() => history.goBack()}> Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default singleChirp;