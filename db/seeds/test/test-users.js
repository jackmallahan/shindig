const users = require('../../../data/mockUsers.json');

const createUsers= (knex, user) => {
  return knex('users').insert({
    name: user.name,
    email: user.email,
    authID: user.authID,
    photo: user.photo
  }, 'id');
}

exports.seed = function(knex, Promise) {
  return knex('users').del()

  .then(() => {
    let userPromises = [];

    users.forEach(user =>
      userPromises.push(createUsers(knex, {
        name: user['name'],
        email: user['email'],
        authID: user['authID'],
        photo: user['photo']
      })));

    return Promise.all(userPromises);
  })

  .then(() => { console.log('Seeding complete.') } )

  .catch(error => console.log(`Error seeding data: ${error}`))
};
