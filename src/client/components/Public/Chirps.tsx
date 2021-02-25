import moment from 'moment';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Chirp } from '../../../common/types';
import apiService from '../../utils/api-service';

const Chirps = (props: chirpProps) => {

    const [chirps, setChirps] = useState<Chirp[]>(null);

    useEffect(() => {
        apiService('/api/chirps')
            .then(chirps => setChirps(chirps))
    }, []);

    return (
        <>
            <div className="container mb-4 ">
                <h1 id="latest">Latest Chirps...</h1>
            </div>
            {chirps?.map(chirp => {
                return (

                    <div key={chirp?.id} className="container" id="card">
                        <div className="row d-flex justify-content-center">
                            <div className="card col-12 border border-dark mb-4">
                                <div className="card-text mt-3">@{chirp?.name} from {chirp?.location} chirps...</div>
                                <div className="card-body">
                                    <p className="card-text" id="cardBody">{chirp?.content}</p>
                                </div>
                                <div className="card-text text-muted d-flex justify-content-between">
                                    <p className="card-text">Last updated {moment(chirp?._created).startOf('minute').fromNow()} at {moment(chirp?._created).format('h:mm a')}</p>
                                    <Link id="svg" to={`/${chirp.id}`}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-dots" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1DA1F2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <circle cx="5" cy="12" r="1" />
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="19" cy="12" r="1" />
                                    </svg></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

interface chirpProps { }


export default Chirps;