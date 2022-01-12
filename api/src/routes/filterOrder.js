const { Router } = require('express');
const { Recipe,Diet } = require('../db');
const axios = require('axios');


const router = Router();

router.get('/', async function(req, res, next){

        let desc = await Recipe.findAll({
            include:{
                model : Diet,
                attributes:['name']
            },
            through: {
                attributes: []
            },
            order: [
                ['title', 'DESC'],
            ]
        })
        res.status(200).json(desc)
    }
)

module.exports = router;
