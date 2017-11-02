const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Shindig';

app.listen(app.get('port'), () => {
  console.log(`${ app.locals.title} is running on ${app.get('port') }.`);
});



app.get('/api/v1/users', (request, response) => {
  database('users').select()

  .then(users => { if (!users.length) {
    return response.status(404).json({ error: 'No users found' })
  } response.status(200).json(users) })

  .catch(error => { response.status(500).json({ error }) })
});



app.post('/api/v1/users', (request, response) => {
  const { displayName, uid, photoURL, email } = request.body;

  if (!displayName || !uid || !photoURL || !email) {
    return response.status(422).json({ error: 'Missing required property' })
  }

  database('users').insert({ displayName, uid, photoURL, email }, '*')
  .then(user => response.status(201).json( user ))
  .catch(error => response.status(500).json({ error }))
});


module.exports = app;
