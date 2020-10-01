// using shortid to generate unique id values
const shortid = require('shortid');   // generate a shortid value using shortid.generate()
const express = require('express');
const server = express();

// GET request for landing page/initial endpoint of api
server.get('/', (req, res) => {
  res.status(200).json({ intiailMessage: 'welcome to the API' });
})

const users = [
  {
    id: 'a_unique_id', 
    name: 'Jane Doe',
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: shortid.generate(),
    name: 'Elijah Kim', 
    bio: 'This project is harder than I thought'
  }
]

// GET request that returns an array of users 
server.get('/api/users', (req, res) => {

})

// POST requests
server.post('/api/users', (req, res) => {

})