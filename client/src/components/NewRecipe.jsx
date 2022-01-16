import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes } from '../actions'


function NewRecipe() {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        score: 0,
        image: '',
        healthy_score: 0,
        steps: '',
        diets: []
    })

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return (
        <div>

            <Link to='/home'>
                <button>Back</button>
            </Link>
            <h1>Create your recipe</h1>
            <form className="container_form " >
                <div >
                    <label>Title:</label>
                    <input
                        type="text"
                        value={formData.title}
                        name='title'
                    >
                    </input>
                </div>
                <div >
                    <label>Summary:</label>
                    <input
                        type="text"
                        value={formData.summary}
                        name='summary'
                    >
                    </input>
                </div>
                <div >
                    <label>Score:</label>
                    <input
                        type="integer"
                        value={formData.score}
                        name='score'
                    >
                    </input>
                </div>
                <div >
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={formData.image}
                        name='image'
                    >
                    </input>
                </div>
                <div >
                    <label>Steps:</label>
                    <input
                        type="text"
                        value={formData.steps}
                        name='steps'
                    >
                    </input>
                </div>
                <div className="checkbox_types" >
                    {
                        types.map(type => {
                            return (
                                <label>
                                    <input
                                        type="checkbox"
                                        value={`${type.name}`}
                                        name={`${type.name}`}
                                    />
                                    {type.name}
                                </label>
                            )
                        })
                    }

                </div>


            </form>
            <div>
                <button>Submit</button>
            </div>
        </div>
    )
}

export default NewRecipe
