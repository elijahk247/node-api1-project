// using shortid to generate unique id values
const shortid = require('shortid');   // generate a shortid value using shortid.generate()
const express = require('express');
const server = express();

// GET request for landing page/initial endpoint of api
server.get('/', (req, res) => {
  res.status(200).json({ intialMessage: 'welcome to the API' });
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

// GET request that returns an array of users, throws an error if nothing found  
server.get('/api/users', (req, res) => {
  if(users) {
    res.status(200).json({ resource: users });
  } else {
    res.status(500).json({ errorMessage: 'The users information could not be retrieved' });
  }
})

// POST requests
server.post('/api/users', (req, res) => {
  const data = req.body;

  if(data.name === undefined || data.bio === undefined) {
    res.status(400).json({ errorMessage: 'Please provide name and bio' })
  } else if(users) {
    users.push({ id: shortid.generate(), ...data });
    res.status(201).json({ resource: users });
  } else {
    res.status(500).json({ errorMessage: 'There was an error while saving user to the database' });
  }
})

module.exports = server;