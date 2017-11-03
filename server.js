const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'AmazonBay';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});


//Endpoints
app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then(users => {
      if (!users.length) {
        return response.status(404).json({ error: 'Users not found.' });
      } return users;
    })
    .then(users => response.status(200).json(users))
    .catch(error => response.status(500).json({ error }));
});



app.post('/api/v1/users', (request, response) => {
  const users = request.body.user;

  if (!users.name || !users.authID || !users.photo || !users.email) {
    return response.status(422).send({ error: 'Your users is missing a required property.'
    });
  }

  database('users').insert(users, '*')
    .then(users => response.status(201).json(users))
    .catch(error => response.status(500).json({ error }));
});


module.exports = app;
