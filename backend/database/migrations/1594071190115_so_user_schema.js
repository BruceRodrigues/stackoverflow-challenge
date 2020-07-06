"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SoUserSchema extends Schema {
  up() {
    this.create("so_users", (table) => {
      table.increments();
      table.string("username", 255).notNullable();
      table.timestamps("creation_date");
    });
  }

  down() {
    this.drop("so_users");
  }
}

module.exports = SoUserSchema;
