"use strict";

const SoUser = use("App/Models/SoUser");

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

module.exports = UserBuilder;
