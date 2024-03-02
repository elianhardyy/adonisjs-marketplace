import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.string('description').notNullable()
      table.integer('qty').notNullable()
      table.integer('price').notNullable()
      table.string('image').nullable()
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('cascade').onUpdate('cascade')
      table.integer('store_id').unsigned().references('id').inTable('stores').onDelete('cascade').onUpdate('cascade')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
