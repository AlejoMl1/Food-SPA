import React from 'react'
import { useState } from 'react'
import { useEffect, useDispatch } from 'react-redux'
import { searchTitle } from '../actions/index'
import './SearchBar.css'
import searchLogo from '../img/search_logo.svg'
import closeLogo from '../img/close_logo.svg'

function SearchBar() {

    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    const handleInputChange = (event) => {

        // if (document.getElementsByClassName("search_input")[0].value.length === 0) {
        //     console.log('emptry data in input search bar , handleInputChange');
        //     setTitle('')
        //     console.log('title when empty', title);
        //     dispatch(searchTitle(title))
        // } else {
        event.preventDefault()
        // console.log('input value', event.target.value);
        setTitle(event.target.value)
        console.log('title status value:', title);
        dispatch(searchTitle(title))
        // }


    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(searchTitle(title))
    }


    return (
        <div className='main'>
            <button type="submit"
                className="main_submit"
                onClick={(event) => handleSubmit(event)}>
                <img src={searchLogo} alt="search logo figure" />
            </button>
            <div className='main_searchBar'>
                <input type="text"
                    placeholder="Search..."
                    onInput={(event) => handleInputChange(event)}
                    className="main_searchBar_input"
                ></input>
            </div>
            <div >
                <button
                    className='main_closeButton'
                    type='reset'>
                    <img src={closeLogo} alt="close logo figure" />
                </button>
            </div>
        </div>
    )
}

export default SearchBar
