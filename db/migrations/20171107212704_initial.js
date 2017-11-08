exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('event_id').unique();
      table.string('name').unique();
      table.string('resource_uri');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('authID').unique();
      table.string('name');
      table.string('email');
      table.string('photo');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('joint_tables', function(table) {
      table.increments('id').primary();
      table.integer('categoryId').unsigned().references('id').inTable('categories');
      table.string('categoryNumber').references('event_id').inTable('categories');
      table.string('name').references('name').inTable('categories');
      table.string('userId').references('authID').inTable('users');

      table.timestamps(true, true);
    }),
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('joint_tables')
  ]);
};
