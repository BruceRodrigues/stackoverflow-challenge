"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const axios = require("axios");
const SoUser = use("App/Models/SoUser");

const URL = "https://api.stackexchange.com/2.2";
const SO_KEY = "U4DMV*8nvpm3EOpvf69Rxw((";
const FILTER = "!40D.p)sqbgakorn)*";
const PAGE_SIZE = "100";
const ORDER = "asc";
const SORT = "creation";
const SITE = "stackoverflow";
const DEFAULT_CREATION_DATE = "2678400";

const API_StackOverflow = axios.create({ baseURL: URL });

function lowerCaseIfExists(value) {
  return value != null ? value.toLowerCase() : "";
}

class UserBuilder {
  async createUsers(users) {
    const usersToCreate = users.map((user) => ({
      username: user.display_name,
      location: lowerCaseIfExists(user.location),
      creation_date: user.creation_date,
    }));
    const soUser = await SoUser.createMany(usersToCreate);
    return soUser;
  }
}

class UserLoader {
  async getUsersFromBrazil() {
    const users = await SoUser.query()
      .whereIn("location", ["brazil", "brasil"])
      .fetch();
    return users;
  }

  async getLastCreationDate() {
    const userCreationDate = await SoUser.query().getMax("creation_date");
    return userCreationDate;
  }
}

const builder = new UserBuilder();
const loader = new UserLoader();

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
    const users = await loader.getUsersFromBrazil()
    return users
  }
    
}

schedule() {
  const lastUserCreationDate = await loader.getLastCreationDate();

    try {
      const res = await API_StackOverflow.get(
        `/users?
      pagesize=${PAGE_SIZE}
      &fromdate=${lastUserCreationDate || DEFAULT_CREATION_DATE}
      &order=${ORDER}
      &sort=${SORT}
      &site=${SITE}&filter=${FILTER}`
      );
      builder.createUsers(res.data.items);
      return res.data;
    } catch (err) {
      console.log(err);
    }
}

module.exports = SoUserController;
