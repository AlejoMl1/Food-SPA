import React from 'react'
import './Card.css'

function Card({ title, image, diet }) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <h5>{diet}</h5>
            <img className="card_image" src={image} alt={` ${title} recipe`} />
        </div>
    )
}

export default Card
