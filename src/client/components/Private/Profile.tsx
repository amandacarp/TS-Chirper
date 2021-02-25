import * as React from 'react';
import { useState, useEffect } from 'react';
import apiService from '../../utils/api-service';
import { IProfileInfo, IProfileChirps } from '../../../common/types'
import { Link } from 'react-router-dom';


const Profile = (props: ProfileProps) => {

    const [info, setInfo] = useState<IProfileInfo>(null);
    const [chirps, setChirps] = useState<IProfileChirps[]>([]);

    useEffect(() => {
        apiService(`/api/users/profile`)
            .then(result => {
                setInfo(result.profile);
                setChirps(result.chirps);
            })
    }, [])



    return (
        <>
        <div className="row justify-content-start">
            <h4 className="border-bottom border-dark m-4" id="welcome">Welcome, {info?.name}! </h4>
            </div>
            <div className="contatiner">
                <div className="row d-flex mt-3 justify-content-center">
                </div>
                <h1 id="latest" className="text-center">Your Chirps...</h1>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-4">
                        <ul className="list-group">
                            {chirps?.map(chirp => (
                                <li key={chirp?.id} className="list-group-item card border border-dark">
                                    <div className="card-text mt-3">{chirp?.location} </div>
                                    <div className="card-body">
                                        <p className="card-text">{chirp?.content}</p>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                    <Link id="button" className="btn shadow mr-4" to={`/${chirp?.id}/edit`}> Edit Chirp</Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}
interface ProfileProps { }

export default Profile;