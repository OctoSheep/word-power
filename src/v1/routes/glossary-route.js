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

const express            = require('express');
const router             = express.Router();
const glossaryController = require('../controllers/glossary-controller');

router.get(
  '/',
  glossaryController.getGlossaries,
);

router.get(
  '/:glossaryName',
  glossaryController.getGlossary,
);

router.post(
  '/',
  glossaryController.createGlossary,
);

router.patch(
  '/:glossaryName',
  glossaryController.updateGlossary,
);

router.delete(
  '/:glossaryName',
  glossaryController.deleteGlossary,
);

module.exports = router;
