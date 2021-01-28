import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IChirp } from './Chirps'
import Swal from 'sweetalert2'

export interface singleChirpProps extends RouteComponentProps<{ id: string }> { };

const singleChirp: React.FC<singleChirpProps> = ({ history, match: { params: { id } } }) => {
    const [chirp, setSingleChirp] = useState<IChirp>({
        id: null,
        content: null,
        location: null,
        _created: null,
        userid: null
    });

    //fetch api data for a single chirp
    const getSingleChirp = async () => {
        const r = await fetch(`/api/chirps/${id}`);
        const singleChirp = await r.json();
        setSingleChirp(singleChirp);
    };

    useEffect(() => {
        getSingleChirp();
    }, [id])

    //use fetch to delete a single chirp based on id
    const deleteChirp = async () => {
        const res = await fetch(`/api/chirps/${id}`, {
            method: 'delete'
        })
            .then(() => {
                Swal.fire({
                    title: `Chirp #${id} Deleted!`,
                    icon: 'success',
                    timer: 1500
                })
            })
            .then(() => { history.push('/') })
            .catch(err => {
                Swal.fire({
                    title: `Error: Chirp not deleted`,
                    icon: 'error',
                    text: err,
                    timer: 1500
                })
                console.log(err)
            })
    }

    //use fetch and useState Hook to edit a chirp
    const [location, setLocation] = useState('')
    const [content, setContent] = useState('')

    const editChirp = async () => {
        const r = await fetch(`/api/chirps/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                location,
                content
            })
        })
            .then(() => { history.push('/') })
            .catch(err => {
                Swal.fire({
                    title: `Error: Chirp not edited`,
                    icon: 'error',
                    text: err,
                    timer: 1500
                })
                console.log(err)
            })
    }

    //return card html to display chirp data
    return (
        <div className="container">
            <div className="form-group">
                <label id="label">Edit your Location</label>
                <input type="text" className="form-control" placeholder={chirp?.location} onChange={event => setLocation(event.target.value)} />
            </div>
            <div className="form-group">
                <label id="label">What Would You Like to Edit?</label>
                <textarea rows="3" className="form-control" placeholder={chirp?.content} onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <button id="button" className="btn mr-4 shadow" onClick={() => editChirp()}> Save Edit</button>
            <button id="button" className="btn mr-4 shadow" onClick={() => deleteChirp()}> Delete Chirp</button>
            <button id="button" className="btn shadow" onClick={() => history.goBack()}> Go Back</button>
        </div>
    )
}

export default singleChirp;