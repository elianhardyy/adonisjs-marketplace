import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.enum('status',['not','pending','paid','canceled']).defaultTo('not')
      table.integer('qty')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').onUpdate('cascade')
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('cascade').onUpdate('cascade')
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
