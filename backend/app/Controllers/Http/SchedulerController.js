"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const axios = require("axios");

const URL = "https://api.stackexchange.com/2.2";
const SO_KEY = "U4DMV*8nvpm3EOpvf69Rxw((";
const FILTER = "!)scTwIGPKENBaPJFDTGy";
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
      last_access_date: user.last_access_date,
    }));
    const soUser = await SoUser.createMany(usersToCreate);
    return soUser;
  }
}

const SoUser = use("App/Models/SoUser");
const loader = use("App/Controllers/Http/UserLoader");
const builder = new UserBuilder();

/**
 * Resourceful controller for interacting with schedulers
 */
class SchedulerController {
  /**
   * Show a list of all schedulers.
   * GET schedulers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
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
}

module.exports = SchedulerController;
