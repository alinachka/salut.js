// import express from 'express';
//
// const port = process.env.PORT || 3000;
// const  index = express();
// index.use(express.json());
//

//
// index.listen(port, () => console.log('Salute on ${port}'));
'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const index = express();

const root = path.resolve(__dirname, './')
index.use(express.static(root));
index.use(bodyparser.json());

index.post('/index-connector', (_, res )=>{
    res.json({ ok: true});
});

const port = process.env.PORT || 3000;
index.listen(port);
