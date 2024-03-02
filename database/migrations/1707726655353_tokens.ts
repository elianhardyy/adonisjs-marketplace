import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tokens'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('type').notNullable()
      table.string('token',64).notNullable()
      //should except in luxon
      table.string('_zone')
      table.string('loc')
      table.string('invalid')
      table.string('weekData')
      table.string('localWeekData')
      table.string('c')
      table.string('o')
      table.string('ts')
      table.string('isLuxonDateTime')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('expires_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
