"use strict";

const SoUser = use("App/Models/SoUser");

class UserLoader {
  async getUsersFromBrazil() {
    const users = await SoUser.query()
      .whereIn("location", ["brazil", "brasil"])
      .orderBy("last_access_date", "asc")
      .fetch();
    return users;
  }

  async getLastCreationDate() {
    const userCreationDate = await SoUser.query().getMax("creation_date");
    return userCreationDate;
  }
}

module.exports = UserLoader;
