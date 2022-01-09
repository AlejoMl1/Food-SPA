import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card'

export default function LandingPage() {

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