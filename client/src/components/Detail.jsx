import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index'


export default function Detail() {

    const dispatch = useDispatch()
    var { id } = useParams();
    // id = id.slice(1);

    useEffect(() => {

        // id.splice(0, 1)
        console.log('id=', id);
        // console.log('id type=', typeof id);
        // let id = '69617efc-c34b-4ecb-bd20-5779125a46f8';
        dispatch(getDetail(id))
    }, [])

    const recipe = useSelector((state) => state.detail);
    console.log('recipe in detail page', recipe);
    // useEffect(()=>{
    //     recipe? dispatch(setLoading(false)):dispatch(setLoading(true))
    // },[recipe])

    // /*unmounting */
    // useEffect(() => {
    //   dispatch(setLoading(true))
    //   return dispatch(resetDetail());
    // },[]);

    // if (recipe) {
    //     console.log('entre acaaa');
    //     var answer = recipe[0].steps.split('|');
    // }


    return (
        <div>

            {
                recipe.length > 0 && (
                    <div className='container_details'>
                        <h1>{recipe[0].title}</h1>
                        <div className='container_details_img'>
                            <img src={recipe[0].image} alt={recipe[0].image} />
                        </div>
                        <div className='container_details_summary'>
                            <h5>{recipe[0].summary.replace(/<[^>]*>?/g, "")}</h5>
                        </div>

                        <div className='container_details_summary_diets'>
                            <h3>Diets:</h3>
                            {
                                recipe[0].diets[0] && (
                                    recipe[0].diets.map(diet => {
                                        return (<ul>{diet.name}</ul>)
                                    })
                                )
                            }
                        </div>
                        <div className='container_details_steps'>
                            <h3>Steps:</h3>
                            <ol>
                                {
                                    recipe[0].steps.split('|').map((step, index) => {
                                        return (<li key={index}> {step}</li>)
                                    })
                                }
                            </ol>


                        </div>


                    </div>

                )
            }
            <Link to='/home'>
                <button>Back To Home</button>
            </Link>
        </div>
    )
}


