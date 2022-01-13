import React from 'react';
import './Page.css'


function Page({ recipesPerPage, allRecipes, page }) {
    // console.log(allRecipes);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className="navbar" >
            <ul className='navbar_ul'>
                {
                    pageNumbers?.map(number => (
                        <li key={number}>
                            <span onClick={() => page(number)}> {number}</span>
                        </li>
                    ))

                }
            </ul>
        </nav>
    )
}

export default Page
