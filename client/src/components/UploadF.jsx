import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadDataToDb } from '../actions/index';
import './UploadF.css'

export default function UploadF() {

    //constant to dispatch the actions


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadDataToDb())
    }, [])

    const handleUpload = (event) => {
        console.log('event=', event);


    }


    return (
        <div className='container_upload'>
            {/* action="" method="POST" */}
            <form encType="multipart/form-data">
                <div className="form-group">
                    <input
                        type="file"
                        className="form-control"
                        name="file"
                        required
                        id=""
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block btn-danger" onClick={handleUpload}>
                        Upload File
                    </button>
                </div>
            </form>
        </div>
    )
}