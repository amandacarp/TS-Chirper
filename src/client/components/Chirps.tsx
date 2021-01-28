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
    <div className="container mb-4" id="latest">
        <h1>Latest Chirps...</h1>
        </div>
            {chirps?.map(chirp => {
                return (
                    <>
                    
                        <div key={chirp?.id} className="container" >
                            <div className="row">
                                <div className="card col-12 mb-4" >
                                    <div id="cardTitle" className="card-header">{chirp?.location} chirps...</div>
                                    <div className="card-body">
                                        <p id="cardBody" className="card-text">{chirp?.content}</p>
                                    </div>
                                    <div className="card-footer text-right">
                                        <Link to={'/' + chirp?.id}><button id="admin" className="btn">Admin Options</button></Link>
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
    location: string
}

export default Chirps;