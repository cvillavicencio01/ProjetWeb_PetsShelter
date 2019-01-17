'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var petService = require('../services/pet.service');


const MODULE_NAME = '[Pet Controller]';
const ERR_PET_NOT_FOUND = 'Pet not found';
const DELETED_SUCCESSFULLY = 'Pet deleted successfully';


function createPet(req, res) {

  try {
    var params = req.body;

    petService.createPet(params).then(function(result){

      if (!_.isUndefined(result) && _.isUndefined(result.error)) {
        res.status(201).json(result);
      } else {
        res.status(409).json(messageHelper.buildMessage(result.error));
      }

    });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createPet.name, error, res);
  }

}


module.exports = {
  createPet,
  ERR_PET_NOT_FOUND,
  DELETED_SUCCESSFULLY,
  MODULE_NAME
}
