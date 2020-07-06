"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const axios = require("axios");
const SoUser = use("App/Models/SoUser");

const URL = "https://api.stackexchange.com/2.2";
const SO_KEY = "U4DMV*8nvpm3EOpvf69Rxw((";
const FILTER = "!40D.p)sqbglw)WhwX";
const PAGE_SIZE = "100";
const ORDER = "asc";
const SORT = "creation";
const SITE = "stackoverflow";

const API_StackOverflow = axios.create({ baseURL: URL });

class UserBuilder {
  async createUsers(users) {
    const usersToCreate = users.map((user) => ({
      username: user.display_name,
      location: user.location,
      creation_date: user.creation_date,
    }));
    console.log(usersToCreate);
    const soUser = await SoUser.createMany(usersToCreate);
    return soUser;
  }
}

const builder = new UserBuilder();

const isFromBrazil = (user) => {
  const location = user.location;
  return location != null
    ? user.location.toLowerCase().includes("brazil") ||
        user.location.toLowerCase().includes("brasil")
    : false;
};

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
  async index({ request, response }) {
    const res = await API_StackOverflow.get(
      `/users?pagesize=${PAGE_SIZE}&order=${ORDER}&sort=${SORT}&site=${SITE}&filter=${FILTER}`
    );
    builder.createUsers(res.data.items);
    return res.data;
  }
}

module.exports = SoUserController;
