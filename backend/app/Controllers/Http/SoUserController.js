"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const axios = require("axios");

const URL = "https://api.stackexchange.com/2.2";
const SO_KEY = "U4DMV*8nvpm3EOpvf69Rxw((";
const FILTER = "!40D.p)sqbglw)WhwX";

const API_StackOverflow = axios.create({ baseURL: URL });

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
      `/users?pagesize=100&order=asc&sort=creation&site=stackoverflow&filter=${FILTER}`
    );
    return res.data;
  }
}

module.exports = SoUserController;
