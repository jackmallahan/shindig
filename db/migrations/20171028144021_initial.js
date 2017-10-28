exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('event_id');
      table.string('name');
      table.string('resource_uri');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email');
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('categories.id');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('users')
  ]);
};
