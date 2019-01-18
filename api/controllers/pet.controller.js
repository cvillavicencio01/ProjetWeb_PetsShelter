'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var petService = require('../services/pet.service');

const MODULE_NAME = '[Pet Controller]';
const ERR_PET_NOT_FOUND = 'Pet not found';
const DELETED_SUCCESSFULLY = 'Pet deleted successfully';


function getPetById(req, res) {
    petService.getPetById(req.swagger.params.id.value)
        .then(pet => pet ? res.json(pet) : res.sendStatus(404));
}


module.exports = {
  getPetById,
  ERR_PET_NOT_FOUND,
  DELETED_SUCCESSFULLY,
  MODULE_NAME
}
