import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("todos", table => {
        table.uuid('id').primary()
        table.string('task_title').notNullable()
        table.string('task_description').notNullable()
        table.boolean('complete').defaultTo(false)
        table.uuid('user_id').notNullable()
        table.foreign('user_id').references("users.id")
        table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable()
        table.dateTime('updated_at').defaultTo(knex.fn.now()).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('todos')
}