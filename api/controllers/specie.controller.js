'use strict';

var _ = require('lodash');

var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
var specieService = require('../services/specie.service');


const MODULE_NAME = '[Specie Controller]';
const ERR_SPECIE_NOT_FOUND = 'Specie not found';
const DELETED_SUCCESSFULLY = 'Specie deleted successfully';



function getSpecies(req, res) {

  try {
    var params = {
      name: req.swagger.params.name.value,
      sort: req.swagger.params.sort.value
    };

    specieService.getSpecies(params).then(function(result){
          res.json(result);
    });

  } catch (error) {
      controllerHelper.handleErrorResponse(MODULE_NAME, getSpecies.name, error, res);
  }


}

function getSpecieById(req, res) {

  try {
    var params = {
      id: req.swagger.params.id.value
    };

    specieService.getSpecieById(params.id).then(function(result){
      if (!_.isUndefined(result)) {
        res.json(result);
      } else {
        res.status(404).json(messageHelper.buildMessage(ERR_SPECIE_NOT_FOUND))
      }
    });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getSpecieById.name, error, res);
  }
}

function createSpecie(req, res) {

  try {
    var params = req.body;

    specieService.createSpecie(params).then(function(result){

      if (!_.isUndefined(result) && _.isUndefined(result.error)) {
        res.status(201).json(result);
      } else {
        res.status(409).json(messageHelper.buildMessage(result.error));
      }

    });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createSpecie.name, error, res);
  }

}

function updateSpecie(req, res) {

  try {

    var params = {
      id: req.swagger.params.id.value
    };

    _.assign(params, req.body);

    specieService.updateSpecie(params).then(function(result){

      if (!_.isUndefined(result) && _.isUndefined(result.error)) {
        res.json(result);
      } else {
        res.status(409).json(messageHelper.buildMessage(result.error));
      }

    });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, updateSpecie.name, error, res);
  }

}

function deleteSpecie(req, res) {

  try {
    var params = {
      id: req.swagger.params.id.value
    };

    specieService.deleteSpecie(params.id).then(function(result){
      if (!_.isUndefined(result) && _.isUndefined(result.error))
        res.json(messageHelper.buildMessage(DELETED_SUCCESSFULLY));
      else
        res.status(404).json(messageHelper.buildMessage(result.error));
    });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, createSpecie.name, error, res);
  }
}

module.exports = {
  getSpecies,
  getSpecieById,
  createSpecie,
  updateSpecie,
  deleteSpecie,
  ERR_SPECIE_NOT_FOUND,
  DELETED_SUCCESSFULLY,
  MODULE_NAME
}
