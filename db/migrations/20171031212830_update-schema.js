exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('join', function(table) {
      table.increments('id').primary();
      table.integer('categoryId').unsigned().references('id').inTable('categories');
      table.integer('userId').unsigned().references('id').inTable('users');
      table.timestamps(true, true);
    }),

    knex.schema.table('users', function(table) {
      table.string('authID');
      table.string('photo');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('join'),

    knex.schema.table('users', function(table) {
      table.dropColumn('authID');
      table.dropColumn('photo');
    })
  ]);
};
