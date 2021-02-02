import moment from 'moment';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Chirp } from '../../common/types';

const Chirps: React.FC = () => {

    const [chirps, setChirps] = useState<Chirp[]>(null);

    const getChirps = async () => {
        const r = await fetch("http://localhost:3000/api/chirps")
        const chirps: Chirp[] = await r.json();
        setChirps(chirps);
    }

    useEffect(() => { getChirps(); }, [])

    return (
        <>
            <div className="container mb-4">
                <h1 id="latest">Latest Chirps...</h1>
            </div>
            {chirps?.reverse().map(chirp => {
                return (
                    
                        <div key={chirp?.id} className="container" id="card">
                            <div className="row">
                                <div className="card col-12 mb-4" >
                                    <div className="card-header">User{chirp?.userid} from {chirp?.location} chirps...</div>
                                    <div className="card-body">
                                        <p className="card-text" id="cardBody">{chirp?.content}</p>
                                    </div>
                                    <div className="card-footer text-muted d-flex justify-content-between">
                                        <p className="card-text">Last updated {moment(chirp?._created).startOf('minute').fromNow()} at {moment(chirp?._created).format('h:mm a')}</p>
                                        <Link id="editButton" className="btn shadow" to={'/' + chirp?.id}>. . .</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                )
            })}
        </>
    )
}


export default Chirps;