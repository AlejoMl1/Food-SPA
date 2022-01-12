import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadDataToDb } from '../actions/index';

export default function LandingPage() {

    //constant to dispatch the actions
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadDataToDb())
    }, [])


    return (
        <div>
            <h1>
                LandingPage
            </h1>
            <Link to="/home">
                <button> Let's Cook! </button>
            </Link>
        </div>
    )
}