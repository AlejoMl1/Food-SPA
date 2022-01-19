import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadDataToDb } from '../actions/index';
import './LandingPage.css'

export default function LandingPage() {

    //constant to dispatch the actions
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadDataToDb())
    }, [])


    return (
        <div className='container_landing'>
            <div className='landing_h1' >
                <h1>
                    Let's Cook!
                </h1>
            </div>
            <div className='landing_h2' >
                <h4>
                    By Alejandro Muñoz
                </h4>
            </div>
            <div className='landing_button' >

                <Link to="/home">
                    <button className='myButton'>Start Now!</button>
                </Link>

            </div>
        </div>
    )
}