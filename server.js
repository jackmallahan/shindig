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
app.locals.title = 'Shindig';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

// Endpoints
app.get('/api/v1/users', (request, response) => {
  database('users')
    .select()
    .then((users) => {
      if (!users.length) {
        return response.status(404).json({ error: 'Users not found.' });
      }
      return users;
    })
    .then(users => response.status(200).json(users))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/categories', (request, response) => {
  database('categories')
    .select()
    .then((categories) => {
      if (!categories.length) {
        return response.status(404).json({ error: 'Categories not found.' });
      }
      return categories;
    })
    .then(categories => response.status(200).json(categories))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/users', (request, response) => {
  const users = request.body.user;

  if (!users.name || !users.authID || !users.photo || !users.email) {
    return response.status(422).send({
      error: 'Your user is missing a required property.',
    });
  }

  database('users')
    .insert(users, '*')
    .then(users => response.status(201).json(users))
    .catch(error => console.log(error));
});

app.post('/api/v1/joint_tables', (request, response) => {
  const newPreference = request.body;

  // for (let userPreferences of [ 'categoryId', 'userId' ]) {
  //   if (!newPreference[userPreferences]) {
  //     return response.status(422).send({ `Expected parameters: { categoryId: <Integer>, userId: <Integer> }. You're missing a ${ userPreferences }.`})
  //   }
  // }

  database('joint_tables').insert({ categoryId: newPreference.categoryId, userId: newPreference.userId }, '*')
    .then(preference => response.status(201).json(preference))
    .catch(error => response.status(500).json({ error }))
});

// TO EDIT PREFERENCES - DELETE USER/PREF LINK IN JOINT TABLE WHEN THAT LINK EXISTS IN THE JOINT TABLE AND A USER UNCHECKS THE BOX -- deleting from the table

module.exports = app;
