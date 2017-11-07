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

app.get('/api/v1/joint_tables', (request, response) => {
  database('joint_tables')
    .select()
    .then((preferences) => {
      if (!preferences.length) {
        return response.status(404).json({ error: 'Preferences not found.' });
      }
      return preferences;
    })
    .then(preferences => response.status(200).json(preferences))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/joint_tables/:userId', (request, response) => {
  const { userId } = request.params;

  database('joint_tables').where({ userId }).select()

    .then(userId => {
      if (!userId.length) {
        return response.status(404).json({ error: 'No user with that Id found' })
      }
      response.status(200).json(userId)
    })

    .catch(error => {
      response.status(500).json({ error })
    })
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

  for (let userPreferences of [ 'categoryId', 'userId', 'prefName' ]) {
    if (!newPreference[userPreferences]) {
      return response.status(422).send('Missing parameters')
    }
  }

  database('joint_tables').insert({ name: newPreference.prefName, categoryId: newPreference.categoryId, userId: newPreference.userId }, '*')
    .then(preference => response.status(201).json(preference))
    .catch(error => response.status(500).json({ error }))
});


// DELETE a preference from the joint table
app.delete('/api/v1/joint_tables/:uid/:categoryId', (request, response) => {
  const { uid, categoryId } = request.params;


  database('joint_tables').where( 'userId', uid ).andWhere( 'categoryId', categoryId ).delete()
    .then(response => {
      if(!response) {
        return response.status(404).json({ error: 'User preference matching id not found' })
      } response.sendStatus(204)
    })
    .catch(error => response.status(500).json({ error }) )
});

module.exports = app;
