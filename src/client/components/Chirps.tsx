import * as React from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

const Chirps: React.FC = props => {

    const [ chirps, setChirps ] = useState<IChirp[]>([]);

    const getChirps = async () => {
        let r = await fetch ("http://localhost:3000/api/chirps")
        let chirps = await r.json();
        setChirps(chirps);
    }

    useEffect(() => {getChirps(); }, [])

    return (
        <>
        {chirps.map(chirp => (
            <>
            <div className= "container">
                <div className= "row">
                <div className="card col-12 mb-4" key={chirp.id}>
                <div className="card-body">
                    <h5 id="cardTitle" className="card-title">{chirp.user}</h5>
                    <p id="cardBody" className="card-text m-4">{chirp.msg}</p>
                    <Link to = {'/' + chirp.id}><button id="admin" className="btn-sm">Admin Options</button></Link>
                </div>
                </div> 
                </div>
                </div>
            </>
        ))}
        </>
    )
}

export interface IChirp {
    id: number,
    user: string,
    msg: string
}

export default Chirps;