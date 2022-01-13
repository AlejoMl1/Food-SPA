import React from 'react';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from './Card';
import { getRecipes, filterRecipesByDiets, filterByOrder } from '../actions/index';
import Page from './Page';

export default function Home() {
    //constant to dispatch the actions
    const dispatch = useDispatch()
    //Allows you to extract data from the Redux store state, using a selector function.
    //The selector will be run whenever the function component renders
    //useSelector() will also subscribe to the Redux store, and run your selector 
    //whenever an action is dispatched.
    // When an action is dispatched, useSelector() will do a reference comparison of the previous 
    // selector result value and the current result value. If they are different, the component 
    // will be forced to re-render. 
    // If they are the same, the component will not re-render.
    const recipesToRender = useSelector(state => state.recipes)
    //Local states
    const [currentPage, setCurrentPage] = useState(1);//starts in 1 because is the first page i want to show
    const recipesPerPage = 9;
    const indexOfLastRecipe = currentPage * recipesPerPage; //9
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;//0
    const currentRecipes = recipesToRender.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const page = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //  By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. 
    useEffect(() => {
        dispatch(getRecipes())
    }, [])//useEffect will execute only one time , because the second parameter is []
    //useEffect will execute when the second parameter change. And will execute the callback function that was set in the first parameter. 

    function handleClick(event) {
        //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
        // For example, this can be useful when:
        // Clicking on a "Submit" button, prevent it from submitting a form
        // Clicking on a link, prevent the link from following the URL
        // Note: Not all events are cancelable. Use the cancelable property to find out if an event is cancelable.
        //*also prevent the page to reload
        event.preventDefault();
        dispatch(getRecipes())
    }

    function handleFilterStatus(event) {
        event.preventDefault();
        // (event.target.value === 'All') ? dispatch(getRecipes()) :
        dispatch(filterRecipesByDiets(event.target.value))
    }
    //function to re organized the cards A-Z or Z-A
    function handleFilterByOrder(event) {
        // event.preventDefault();
        // (event.target.value === 'All') ? dispatch(getRecipes()) :
        dispatch(filterByOrder(event.target.value))
    }

    return (
        <div className="container">

            <div container_ownRecipe>
                <Link to="/recipe" > Create your own recipe </Link>
                <h1> Go go go go go go </h1>
                <button onClick={event => handleClick(event)}  >
                    Load all the recipes again
                </button>
            </div>
            <div>
                <select className='select_order' onClick={event => handleFilterByOrder(event)}>
                    <option value="ASC">A-Z </option>
                    <option value="DESC">Z-A</option>
                </select>
                <select className="diets_select" onChange={event => handleFilterStatus(event)}>
                    <option value="All">All</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="vegetarian">Vegetarian</option>
                </select>

                <Page
                    recipesPerPage={recipesPerPage}
                    allRecipes={recipesToRender.length}
                    page={page}
                />
                <div className='cards_container'>
                    {
                        currentRecipes?.map(el => {
                            return (
                                // <fragment className="cards_fragment">
                                <Link to={'/home' + el.id}>
                                    <Card
                                        className='card_image'
                                        title={el.title}
                                        image={el.image}
                                        diet={el.diets.map(diet => {
                                            return diet.name
                                        }).join('| ')}


                                        key={el.id} />
                                </Link>
                                // </fragment>
                                // diet={el.diets.map(diet => {
                                //     return diet.name
                                // })} 
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}