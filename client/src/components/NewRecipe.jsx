import React from 'react'
import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, postRecipe } from '../actions'
import './NewRecipe.css'
function NewRecipe() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    const types = useSelector((state) => state.types)
    console.log('-----------------------------');
    console.log('newRecipe component render');

    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        score: '',
        image: '',
        healthy_score: '',
        steps: '',
        diets: []
    })
    console.log('formData status:', formData);

    const [errors, setErrors] = useState({})

    console.log('errors state:', errors);
    const navigate = useNavigate();


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
        setErrors(validate({
            ...formData,
            [event.target.name]: event.target.value
        }))
        // console.log(formData);
    }

    const handleCheckBoxChange = (event) => {
        // console.log('checkbox name:', event.target.name);
        // console.log('checkbox value:', event.target.value)
        let dietsArray = formData.diets ? formData.diets.map(diet => diet) : []
        // console.log('dietsArray:', dietsArray);
        if (event.target.checked) {
            dietsArray.push(event.target.name)
            setFormData({
                ...formData,
                diets: dietsArray
            })
        } else {
            //*if the checkbox was checked in the past ,take the name of the diet out of the state            dietsArray = dietsArray.filter(diet => diet !== event.target.name)
            // console.log('dietsArray false:', dietsArray);
            dietsArray = dietsArray.filter(diet => diet !== event.target.name)
            setFormData({
                ...formData,
                diets: dietsArray
            })
        }
    }
    const navigateToHome = useCallback(() => navigate('/home', { replace: true }), [navigate]);


    const updateImageUrl = () => {

        setFormData((state) => {
            // console.log('que es este state?', state);
            return {
                ...state,
                image: state.image + 'https://spoonacular.com/recipeImages/715415-312x231.jpg',
            }
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (Object.keys(errors).length !== 0) {
            alert('Please fix the errors in the form')
        } else {
            //load a default image if the user doesnt type an url
            // console.log('!formData.image=', !formData.image);
            //!this is for image default in case the user left the input empty
            //*I clone the formData because setState is an asynchronous method and i couldnt make
            //*the updater function works that i tried in updateImageUrl
            if (!formData.image) {
                var cloneFormData = { ...formData }
                //*my solution was to make a copy of the data i want to post, add the default image
                cloneFormData.image = 'https://spoonacular.com/recipeImages/715415-312x231.jpg'
            }
            // console.log('formdta in submit second', formData.image);
            //*And then pass that data to the postRecipe method
            dispatch(postRecipe(cloneFormData))
            alert('Recipe created susccessfully')
            navigateToHome()
        }
    }

    const validate = (input) => {

        // console.log('input score', input.score);
        // console.log('typeof (input.score)', typeof (input.score));
        // console.log('!Number.isInteger(input.score)', !Number.isInteger(input.score));
        // console.log('typeof (input.score) !== number', typeof (input.score) !== 'number');
        //*sometimes the input was a numer but in string method 
        input.score = parseInt(input.score)
        let errors = {}
        if (!input.title) {
            errors.title = 'Title is required'
        } else if (!input.summary) {
            errors.summary = 'Summary is required'
        } else if (!input.score) {
            errors.score = 'Score is required'
        } else if (input.score < 0 || input.score > 100) {
            errors.score = 'Score must be a positive number between 0-100'
        } else if (input.healthy_score < 0 || input.healthy_score > 100) {
            errors.score = 'Score must be a positive number between 0-100'
        }
        return errors
    }

    return (
        <div className='main_container'>

            <div className='left_container' >
                <h1 className='h1_title'>Create Your Recipe</h1>
                <form className="container_form" >
                    <div className='elements'>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={formData.title}
                            name='title'
                            onChange={handleChange}
                            placeholder='Title of the recipe'
                        >
                        </input>
                        {
                            errors.title && (
                                <p className='errors'>{errors.title}</p>
                            )
                        }
                    </div >
                    <div className='elements' >
                        <label>Summary:</label>
                        <input
                            type="text"
                            value={formData.summary}
                            name='summary'
                            onChange={handleChange}
                            placeholder='A brief summary of the recipe'
                        >
                        </input>
                        {
                            errors.summary && ((
                                <p className='errors'>{errors.summary}</p>
                            ))
                        }
                    </div>
                    <div className='elements' >
                        <label>Score:</label>
                        <input
                            type="number"
                            value={formData.score}
                            name='score'
                            onChange={handleChange}
                            placeholder='0-100'
                        >
                        </input>
                        {
                            errors.score && ((
                                <p className='errors'>{errors.score}</p>
                            ))
                        }
                    </div>
                    <div className='elements'>
                        <label>Healthy Score:</label>
                        <input
                            type="number"
                            value={formData.healthy_score}
                            name='healthy_score'
                            onChange={handleChange}
                            placeholder='0-100'
                        >
                        </input>
                        {
                            errors.healthy_score && ((
                                <p className='errors'>{errors.healthy_score}</p>
                            ))
                        }
                    </div>
                    <div className='elements'>
                        <label>Image URL:</label>
                        <input
                            type="text"
                            value={formData.image}
                            name='image'
                            onChange={handleChange}
                            placeholder='url of the image'
                        >
                        </input>
                        {
                            errors.image && (((
                                <p className='errors'>{errors.image}</p>
                            )))
                        }
                    </div>
                    <div className='elements'>
                        <label>Steps:</label>
                        <input
                            type="text"
                            value={formData.steps}
                            name='steps'
                            onChange={handleChange}
                            placeholder='write the steps'
                        >
                        </input>
                        {
                            errors.steps && ((
                                <p className='errors'>{errors.steps}</p>
                            ))
                        }
                    </div>
                </form>
                <div className='container_buttons'>
                    <Link to='/home'>
                        <button className='container_buttons_back' >Go Back</button>
                    </Link>
                    <Link to='/home'>
                        <button className='container_buttons_submit' onClick={handleSubmit}>Submit</button>
                    </Link>

                </div>
            </div>
            <div className='rigth_container' >
                <div className='rigth_container_h1' >
                    <h1 >Select Diet Types:</h1>
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
                                        onChange={handleCheckBoxChange}
                                    />
                                    {type.name}
                                </label>
                            )
                        })
                    }

                </div>
            </div>




        </div>
    )
}

export default NewRecipe
