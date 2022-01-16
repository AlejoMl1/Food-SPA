import React from 'react'
import { useState } from 'react'
import { useEffect, useDispatch } from 'react-redux'
import { searchTitle } from '../actions/index'

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
        <div>
            <input type="text"
                placeholder="Search..."
                onInput={(event) => handleInputChange(event)}
                className="search_input"
            ></input>
            <button type="submit"
                className="search_button"
                onClick={(event) => handleSubmit(event)}
            >Search
            </button>
        </div>
    )
}

export default SearchBar
