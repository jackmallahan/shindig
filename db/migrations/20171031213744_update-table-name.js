exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.renameTable('join', 'joint_tables')
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('joint_tables')
  ])
}
