const { Router } = require('express');
const { Recipe,Diet } = require('../db');
const axios = require('axios');


const router = Router();

router.get('/', async function(req, res, next){
    try{
        let { order } = req.query;
        // console.log('entreeee',order);
        order = order.toUpperCase()

        if(order === 'DESC'||order === 'ASC') {

            let filterArray = await Recipe.findAll({
                include:{
                    model : Diet,
                    attributes:['name']
                },
                through: {
                    attributes: []
                },
                order: [
                    ['title', order],
                ]
            })
            res.status(200).json(filterArray)
        }else{
            res.status(404).send({ message: 'No filter in that category' });
        }
    }catch(error) {
        console.error(error.message);
        res.status(404).send('Error filtering ')   
    }
})

module.exports = router;
