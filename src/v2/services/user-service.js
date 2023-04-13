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

const User = require('../database/user-database');

const code2session = (code) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    fetch(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.WX_APPID}&secret=${process.env.WX_SECRET}&js_code=${code}&grant_type=authorization_code`,
    ).then((res) => {
      res.json().then((json) => {
        resolve(json.openid);
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

const getUser = (code) => {
  return new Promise((
    resolve,
    reject,
  ) => {
    code2session(code).then((openid) => {
      User.getUser(openid).then((user) => {
        if (user) {
          resolve(user);
        } else {
          User.getUsersCount().then((count) => {
            if (count <= 0) {
              User.createUser(
                openid,
                true,
              ).then((user) => {
                resolve(user);
              }).catch((error) => {
                reject(error);
              });
            } else {
              User.createUser(
                openid,
                false,
              ).then((user) => {
                resolve(user);
              }).catch((error) => {
                reject(error);
              });
            }
          });
        }
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

module.exports = {
  code2session,
  getUser,
};