import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('hashs', (table) => {
        table.uuid('id').primary()
        table.dateTime("time_created").defaultTo(knex.fn.now()).notNullable()
        table.string('email').notNullable()
        table.string('hash').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('hashs')
}