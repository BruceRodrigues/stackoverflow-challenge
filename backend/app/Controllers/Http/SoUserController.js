"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const loader = use("App/Controllers/Http/UserLoader");

/**
 * Resourceful controller for interacting with sousers
 */
class SoUserController {
  /**
   * Show a list of all stackoverflowusers.
   * GET stackoverflowusers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const users = await loader.getUsersFromBrazil();
    return users;
  }
}

module.exports = SoUserController;
