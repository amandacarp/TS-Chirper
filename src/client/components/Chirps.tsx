import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const Chirps: React.FC = () => {

    const [chirps, setChirps] = useState<IChirp[]>(null);

    const getChirps = async () => {
        const r = await fetch("http://localhost:3000/api/chirps")
        const chirps = await r.json();
        setChirps(chirps);
    }

    useEffect(() => { getChirps(); }, [])

    return (
        <>
            <div className="container mb-4">
                <h1 id="latest">Latest Chirps...</h1>
            </div>
            {chirps?.map(chirp => {
                return (
                    <>
                        <div key={chirp?.id} className="container" id="card" >
                            <div className="row">
                                <div className="card col-12 mb-4" >
                                    <div className="card-header">User{chirp?.userid} from {chirp?.location} chirps...</div>
                                    <div className="card-body">
                                        <p className="card-text" id="cardBody">{chirp?.content}</p>
                                    </div>
                                    <div className="card-footer text-muted d-flex justify-content-between">
                                        <p className="card-text">Created on {chirp?._created}</p>
                                        <Link id="button" className="btn shadow" to={'/' + chirp?.id}>Admin Options</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    )
}

export interface IChirp {
    id: number,
    content: string,
    location: string,
    _created: number,
    userid: number
}

export default Chirps;