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
    res.status(500).send({
      status:  500,
      message: 'Internal server error.',
      data:    reject,
    });
  });
};

const getGlossary = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  glossaryService.getGlossary(glossaryName).then((resolve) => {
    // console.log(resolve);
    if (resolve === null) {
      res.status(404).send({
        status:  404,
        message: 'Glossary not found.',
        data:    null,
      });
    } else {
      res.status(200).send({
        status:  200,
        message: 'Get an existing glossary.',
        data:    resolve,
      });
    }
  }).catch((reject) => {
    // console.log(reject);
    res.status(500).send({
      status:  500,
      message: 'Internal server error.',
      data:    reject,
    });
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
             || body.name === '') {
    res.status(400).send({
      status:  400,
      message: 'Name is required.',
      data:    null,
    });
  } else if (body.description === undefined || body.description === null
             || body.description === '') {
    res.status(400).send({
      status:  400,
      message: 'Description is required.',
      data:    null,
    });
  } else if (body.vocabularies === undefined || body.vocabularies === null) {
    res.status(400).send({
      status:  400,
      message: 'Vocabularies are required.',
      data:    null,
    });
  } else if (Array.isArray(body.vocabularies) === false) {
    res.status(400).send({
      status:  400,
      message: 'Vocabularies must be an array.',
      data:    null,
    });
  } else {
    glossaryService.createGlossary(body).then((resolve) => {
      // console.log(resolve);
      if (resolve === null) {
        res.status(409).send({
          status:  409,
          message: 'Glossary already exists.',
          data:    null,
        });
      } else {
        res.status(201).send({
          status:  201,
          message: 'Create a new glossary.',
          data:    resolve,
        });
      }
    }).catch((reject) => {
      // console.log(reject);
      if (reject.code === 11000) {
        res.status(409).send({
          status:  409,
          message: 'Glossary already exists.',
          data:    null,
        });
      } else {
        res.status(500).send({
          status:  500,
          message: 'Internal server error.',
          data:    reject,
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
             && body.name === '') {
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
             && body.description === '') {
    res.status(400).send({
      status:  400,
      message: 'Description is required.',
      data:    null,
    });
  } else {
    glossaryService.updateGlossary(glossaryName, body).then((resolve) => {
      // console.log(resolve);
      if (resolve.matchedCount === 0) {
        res.status(404).send({
          status:  404,
          message: 'Glossary not found.',
          data:    null,
        });
      } else {
        res.status(200).send({
          status:  200,
          message: 'Update an existing glossary.',
          data:    resolve,
        });
      }
    }).catch((reject) => {
      // console.log(reject);
      res.status(500).send({
        status:  500,
        message: 'Internal server error.',
        data:    reject,
      });
    });
  }
};

const deleteGlossary = (req, res) => {
  const glossaryName = req.params['glossaryName'];
  glossaryService.deleteGlossary(glossaryName).then((resolve) => {
    // console.log(resolve);
    if (resolve.deletedCount === 0) {
      res.status(404).send({
        status:  404,
        message: 'Glossary not found.',
        data:    null,
      });
    } else {
      res.status(200).send({
        status:  200,
        message: 'Delete an existing glossary.',
        data:    resolve,
      });
    }
  }).catch((reject) => {
    // console.log(reject);
    res.status(500).send({
      status:  500,
      message: 'Internal server error.',
      data:    reject,
    });
  });
};

module.exports = {
  getGlossaries,
  getGlossary,
  createGlossary,
  updateGlossary,
  deleteGlossary,
};
