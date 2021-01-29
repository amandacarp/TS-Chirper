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
        userid: null,
    });

    //fetch api data for a single chirp
    const getSingleChirp = async () => {
        const r = await fetch(`/api/chirps/${id}`);
        const singleChirp = await r.json();
        setSingleChirp(singleChirp[0]);
    };

    useEffect(() => {
        getSingleChirp();
    }, [id])

    //use fetch to delete a single chirp based on id
    const deleteChirp = async () => {
        await fetch(`/api/chirps/${id}`, {
            method: 'delete'
        }) 
            .then(() => {
                Swal.fire({
                    title: `Are you sure you want to delete your chirp?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: 'Deleted!',
                        text: `Your Chirp# ${chirp.id} has been deleted.`,
                        imageUrl: 'data:image/jpeg;base64,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',
                        icon: 'success',
                    })
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                      ) {
                        Swal.fire(
                          'Cancelled',
                          'Chirp not deleted',
                          'error'
                        )
                    }
                  })

            }).then(() => { history.push('/') })
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
        .then(() => {
            Swal.fire({
                title: `Save your edit?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, save edit'
            }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: 'Edit Saved!',
                    text: `Your Chirp# ${chirp.id} has been saved.`,
                    icon: 'success',
                    imageUrl:'data:image/jpeg;base64,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',
                })
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                          'Cancelled',
                          'Chirp not edited',
                          'error'
                        )
                }
              })

        })
        .then(() => history.push('/') )
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
                <label id="label">Edit your Chirp</label>
                <textarea rows="3" className="form-control" placeholder={chirp?.content} onChange={event => setContent(event.target.value)}></textarea>
            </div>
            <button id="button" className="btn mr-4 shadow" onClick={() => editChirp()}> Save Edit</button>
            <button id="button" className="btn mr-4 shadow" onClick={() => deleteChirp()}> Delete Chirp</button>
            <button id="button" className="btn shadow" onClick={() => history.goBack()}> Go Back</button>
        </div>
    )
}

export default singleChirp;