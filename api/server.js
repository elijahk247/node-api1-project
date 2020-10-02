// using shortid to generate unique id values
let shortid = require('shortid');   // generate a shortid value using shortid.generate()
const express = require('express');
const server = express();

// GET request for landing page/initial endpoint of api
server.get('/', (req, res) => {
  res.status(200).json({ intialMessage: 'welcome to the API' });
})

let users = [
  {
    id: 'a_unique_id', 
    name: 'Jane Doe',
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: 1,
    name: 'Elijah Kim', 
    bio: 'This project is harder than I thought'
  },
  {
    id: 2,
    name: 'bo',
    bio: 'bo'
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

// GET request by id, throws error if user by that id is not found
server.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = users.find(user => {
    return user.id === id;
  });

  if(found) {
    const user = users.filter(person => {
      return person.id === id;
    });
    console.log(user);
    res.status(200).json({ 
      message: 'The user has been found', 
      user: user 
    })
  } else if (!found) {
    res.status(404).json({ message: 'The user with the specified ID does not exist '});
  } else {
    res.status(500).json({ errorMessage: 'The user information could not be retrieved' });
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

// DELETE request by grabbing a specific id
server.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = users.find(user => user.id === id);

  if(found) {
    users = users.filter(user => user.id !== id);
    res.status(200).json({ 
      message: 'User successfully removed',
      users: users 
    });
  } else if(!found) {
    res.status(404).json({ Message: 'The user with the specified ID does not exist' });
  } else {
    res.status(500).json({ errorMessage: 'The user could not be removed' });
  }
})

// PUT request by grabbing a specific id
server.put('/api/users/:id', (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const changes = req.body;
  const found = users.find(user => user.id === id);

  if(!found) {
    res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  } else if(found) {
    Object.assign(found, changes);
    res.status(200).json({ 
      message: 'Updated the user',
      users: users
    });
  } else if (data.name === undefined || data.bio === undefined) {
    res.status(400).json({ errorMessage: 'Please provide a name and bio for the user'});
  } else {
    res.status(500).json({ message: 'The user information could be updated' });
  }
})

module.exports = server;