const joint_tables = require('../../../data/mockJoin.json');

const createJoinTable = (knex, join) => {
  return knex('joint_tables').insert({
    categoryId: join.categoryId,
    name: join.name,
    userId: join.userId
  }, 'id');
}

exports.seed = function(knex, Promise) {
  return knex('joint_tables').del()

  .then(() => {
    let joinPromises = [];

    joint_tables.forEach(join =>
      joinPromises.push(createJoinTable(knex, {
        categoryId: join['categoryId'],
        name: join['name'],
        userId: join['userId']
      })));

    return Promise.all(joinPromises);
  })

  .then(() => { console.log('Seeding complete.') } )

  .catch(error => console.log(`Error seeding data: ${error}`))
};
