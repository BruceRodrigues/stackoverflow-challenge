"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SoUserSchema extends Schema {
  up() {
    this.create("so_users", (table) => {
      table.increments();
      table.string("username", 255).notNullable();
      table.string("location");
      table.bigInteger("creation_date");
      table.bigInteger("last_access_date");
      table.timestamps();
    });
  }

  down() {
    this.drop("so_users");
  }
}

module.exports = SoUserSchema;
