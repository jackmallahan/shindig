const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', 3001);
app.locals.title = 'Shindig';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});



app.get('/api/v1/users', (request, response) => {
  database('users').select()

  .then(users => {
    if (!users.length) {
      return response.status(404).json({ error: 'No users found' })
    } response.status(200).json(users) })

  .catch(error => { response.status(500).json({ error }) })
});



app.post('/api/v1/users', (request, response) => {
  const { name, authID, user_id, photo, email } = request.body;

  // console.log(request.body)

  if (!name || !authID || !user_id || !photo || !email) {
    return response.status(422).json({ error: 'Missing required property' })
  }

  database('users').insert({ name: name, email: email, user_id: user_id, photo: photo, authID: authId }, '*')
  .then(user => response.status(201).json( user[0] ))
  .catch(error => response.status(500).json({ error }))
});


module.exports = app;
