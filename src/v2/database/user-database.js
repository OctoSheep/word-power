/*
 * Copyright (c) 2023. OctoSheep
 *
 * This file is part of Word Power.
 *
 * Word Power is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.
 *
 * Word Power is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with Word Power. If not, see <https://www.gnu.org/licenses/>.
 */

require('../../v1/database/connection');
const userModel = require('../models/user');

const getUser = (
  openid,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    userModel.findOne(
      {
        openid: openid,
      },
      {},
      {},
    ).exec(
    ).then((user) => {
        resolve(user);
      },
    ).catch(
      (err) => {
        reject(err);
      },
    );
  });
};

const getUsersCount = () => {
  return new Promise((
    resolve,
    reject,
  ) => {
    userModel.find(
      {},
      {},
      {},
    ).exec(
    ).then((users) => {
        resolve(users.length);
      },
    ).catch((err) => {
        reject(err);
      },
    );
  });
};

const createUser = (
  openid,
  admin,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    const user = new userModel({
      openid:     openid,
      name:       openid,
      admin:      admin,
      globalData: null,
      glossary:   [],
    });
    userModel.create(
      [user],
      {},
    ).then((users) => {
        resolve(users[0]);
      },
    ).catch(
      (err) => {
        reject(err);
      },
    );
  });
};

const updateUser = (
  openid,
  name,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    userModel.updateOne(
      {
        openid: openid,
      },
      {
        $set: {
          name: name,
        },
      },
      {},
    ).exec(
    ).then((user) => {
        resolve(user);
      },
    ).catch(
      (err) => {
        reject(err);
      },
    );
  });
};

const deleteUser = (
  openid,
) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    userModel.deleteOne(
      {
        openid: openid,
      },
      {},
    ).exec(
    ).then((user) => {
        resolve(user);
      },
    ).catch(
      (err) => {
        reject(err);
      },
    );
  });
};

module.exports = {
  getUser,
  getUsersCount,
  createUser,
  updateUser,
  deleteUser,
};
