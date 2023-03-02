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

const glossaryService = require('../services/glossary-service');

const getGlossaries = (req, res) => {
  glossaryService.getGlossaries().then((resolve) => {
    // console.log(resolve);
    res.status(200).send({
      status:  200,
      message: 'Get all glossaries.',
      data:    resolve,
    });
  }).catch((reject) => {
    // console.log(reject);
    if (typeof reject === 'object') {
      res.status(reject.status).send({
        status:  reject.status,
        message: reject.message,
        data:    reject.data,
      });
    } else {
      res.status(500).send({
        status:  500,
        message: 'Internal server error.',
        data:    null,
      });
    }
  });
};

const getGlossary = (req, res) => {
  const glossaryName = req.params['glossaryName'];

  glossaryService.getGlossary(glossaryName).then((resolve) => {
    // console.log(resolve);
    res.status(200).send({
      status:  200,
      message: 'Get an existing glossary.',
      data:    resolve,
    });
  }).catch((reject) => {
    // console.log(reject);
    if (typeof reject === 'object') {
      res.status(reject.status).send({
        status:  reject.status,
        message: reject.message,
        data:    reject.data,
      });
    } else {
      res.status(500).send({
        status:  500,
        message: 'Internal server error.',
        data:    null,
      });
    }
  });
};

const createGlossary = (req, res) => {
  const body = req.body;

  if (body === undefined || body === null) {
    res.status(400).send({
      status:  400,
      message: 'Body is required.',
      data:    null,
    });
  } else if (body.name === undefined || body.name === null
             || body.name.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'Name is required.',
      data:    null,
    });
  } else if (body.description === undefined || body.description === null
             || body.description.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'Description is required.',
      data:    null,
    });
  } else {
    let url = body.url;
    if (url !== undefined && url !== null && url !== '') {
      try {
        url = new URL(url);
      } catch (e) {
        console.log(e);
        res.status(400).send({
          status:  400,
          message: 'URL is invalid.',
          data:    null,
        });
      }
    }
    glossaryService.createGlossary(body.name, body.description, url).
                    then((resolve) => {
                      // console.log(resolve);
                      res.status(201).send({
                        status:  201,
                        message: 'Create a new glossary.',
                        data:    resolve,
                      });
                    }).
                    catch((reject) => {
                      // console.log(reject);
                      if (typeof reject === 'object') {
                        res.status(reject.status).send({
                          status:  reject.status,
                          message: reject.message,
                          data:    reject.data,
                        });
                      } else {
                        res.status(500).send({
                          status:  500,
                          message: 'Internal server error.',
                          data:    null,
                        });
                      }
                    });
  }
};

const updateGlossary = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  const body         = req.body;

  if (body === undefined || body === null) {
    res.status(400).send({
      status:  400,
      message: 'Body is required.',
      data:    null,
    });
  } else if (body.name !== undefined && body.name !== null
             && typeof body.name !== 'string') {
    res.status(400).send({
      status:  400,
      message: 'Name must be a string.',
      data:    null,
    });
  } else if (body.name !== undefined && body.name !== null
             && body.name.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'Name is required.',
      data:    null,
    });
  } else if (body.description !== undefined && body.description !== null
             && typeof body.description !== 'string') {
    res.status(400).send({
      status:  400,
      message: 'Description must be a string.',
      data:    null,
    });
  } else if (body.description !== undefined && body.description !== null
             && body.description.length === 0) {
    res.status(400).send({
      status:  400,
      message: 'Description is required.',
      data:    null,
    });
  } else {
    glossaryService.updateGlossary(glossaryName, body).then((resolve) => {
      // console.log(resolve);
      res.status(200).send({
        status:  200,
        message: 'Update an existing glossary.',
        data:    resolve,
      });
    }).catch((reject) => {
      // console.log(reject);
      if (typeof reject === 'object') {
        res.status(reject.status).send({
          status:  reject.status,
          message: reject.message,
          data:    reject.data,
        });
      } else {
        res.status(500).send({
          status:  500,
          message: 'Internal server error.',
          data:    null,
        });
      }
    });
  }
};

const deleteGlossary = (req, res) => {
  const glossaryName = req.params['glossaryName'];

  glossaryService.deleteGlossary(glossaryName).then((resolve) => {
    // console.log(resolve);
    res.status(200).send({
      status:  200,
      message: 'Delete an existing glossary.',
      data:    resolve,
    });
  }).catch((reject) => {
    // console.log(reject);
    if (typeof reject === 'object') {
      res.status(reject.status).send({
        status:  reject.status,
        message: reject.message,
        data:    reject.data,
      });
    } else {
      res.status(500).send({
        status:  500,
        message: 'Internal server error.',
        data:    null,
      });
    }
  });
};

module.exports = {
  getGlossaries,
  getGlossary,
  createGlossary,
  updateGlossary,
  deleteGlossary,
};
