'use strict'

const express = require('express');
const app = express();
const mysqlPool = require('./mysqlpool');
const utils = require('./utils');
const redis = require('redis');

//Express middleware
app.use(express.json());

//Get request
app.get('/competitor', async (req,res) => {
    try {
        const url = `redis://10.0.25.102:6379`;

        //Create RedisPoolConnection
        const redisClient = redis.createClient({url});

        await redisClient.connect();

        let results = await redisClient.get('competitors');


    } catch (error) {
        
    }
});

app.post('/competitor', async (req,res) => {

    try {

        if(!req.body.surname || !req.body.name) res.status(400).json({error:400,message:'Invalid Request'});

        let sqlQuery = `INSERT INTO competitor (surname,name) VALUES ('${req.body.surname}','${req.body.name}')`

        let dbResults = await utils.executeQuery(mysqlPool,sqlQuery);

        console.log('dbResults ===> ',dbResults);

        res.json({success:req.body.surname});
        
    } catch (error) {
        
        console.log('main Error ===> ',error);

        res.status(400).json(error);
    }
    
});

//App listening
app.listen(80,()=>{
    console.log('app listening at 80')
});