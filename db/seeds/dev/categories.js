const categories = require('../../../data/categoriesList.json');
// const pokemon = require('../../../pokemon-data.json');

const createCategory = (knex, category) => {
  return knex('categories').insert({
    name: category.name,
    event_id: category.event_id,
    resource_uri: category.resource_uri
  }, 'id');
}

exports.seed = function(knex, Promise) {
  return knex('categories').del()

  .then(() => {
    let categoryPromises = [];

    categories.forEach(category =>
      categoryPromises.push(createCategory(knex, {
        name: category['name'],
        event_id: category['id'],
        resource_uri: category['resource_uri']
      })));

    return Promise.all(categoryPromises);
  })

  .then(() => { console.log('Seeding complete.') } )

  .catch(error => console.log(`Error seeding data: ${error}`))
};
