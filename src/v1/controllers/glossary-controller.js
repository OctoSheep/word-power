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
        res.send({ status: 200, message: 'Get all glossaries.', data: resolve });
    });
};

const getGlossary = (req, res) => {
    // noinspection JSUnusedLocalSymbols
    const glossary = glossaryService.getGlossary();
    res.send('Get an existing glossary');
};

const createGlossary = (req, res) => {
    // noinspection JSUnusedLocalSymbols
    const createdGlossary = glossaryService.createGlossary();
    res.send('Create a new glossary');
};

const updateGlossary = (req, res) => {
    // noinspection JSUnusedLocalSymbols
    const updatedGlossary = glossaryService.updateGlossary();
    res.send('Update an existing glossary');
};

const deleteGlossary = (req, res) => {
    // noinspection JSUnusedLocalSymbols
    const deletedGlossary = glossaryService.deleteGlossary();
    res.send('Delete an existing glossary');
};

module.exports = {
    getGlossaries,
    getGlossary,
    createGlossary,
    updateGlossary,
    deleteGlossary,
};
