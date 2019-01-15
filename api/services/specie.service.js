'use strict';

var _ = require('lodash');

var specieRepository = require('../repositories/specie.repository');
var messageHelper = require('../helpers/message.helper');

const ERR_CREATE_ALREADY_EXISTS_WITH_SAME_NAME = 'It\'s not possible to create a specie. There is a specie with the same name in the system';
const ERR_UPDATE_ALREADY_EXISTS_WITH_SAME_NAME = 'It\'s possible to update a specie. There is a specie with the same name to update in the system';
const ERR_UPDATE_NOT_FOUND_BY_ID = 'It\'s not possible to update a specie. There is NOT a specie with the same id to update'
const ERR_DELETE_NOT_FOUND_BY_ID = 'It\'s not possible to delete a specie. Specie not found';
const ERR_DELETE_EXISTS_ASSOCIATED = 'It\' not possible to delete a specie. There may be some associated data';

function getSpecies(params) {
  return specieRepository.getSpecies(params).then(function(species){
    return species;
  });
}

function getSpecieById(id) {
  return specieRepository.getSpecieById(id).then(function(specie){
    return specie;
  });
}

function getSpecieByName(name) {
  return specieRepository.getSpecieByName(name).then(function(specie){
    return specie;
  });
}

function createSpecie(params) {

  return module.exports.getSpecieByName(params.name).then(function(specieFound){
    if (_.isUndefined(specieFound)) {
      return specieRepository.createSpecie(params).then(function(specie){
        return specie;
      });
    } else {
      return messageHelper.buildErrorMessage(ERR_CREATE_ALREADY_EXISTS_WITH_SAME_NAME);
    }
  });
}

function updateSpecie(params) {

  return module.exports.getSpecieById(params.id).then(function(specieFoundById){

    if (!_.isUndefined(specieFoundById)) {

      return module.exports.getSpecieByName(params.name).then(function(specieFoundByName){

        if (_.isUndefined(specieFoundByName) || specieFoundByName.id === params.id) {
          return specieRepository.updateSpecie(params);
        } else {
          return messageHelper.buildErrorMessage(ERR_UPDATE_ALREADY_EXISTS_WITH_SAME_NAME);
        }

      });

    } else {
      return messageHelper.buildErrorMessage(ERR_UPDATE_NOT_FOUND_BY_ID);
    }

  });

}

function deleteSpecie(id) {

  return module.exports.getSpecieById(id).then(function(mySpecie){

    if (!_.isUndefined(mySpecie)) {
      var filterParams = {
        specie: mySpecie.name
      };

      return specieRepository.deleteSpecie(id).then(function(resultDeletion){
        if (resultDeletion)
          return true;
        else
          return messageHelper.buildErrorMessage(ERR_DELETE_NOT_FOUND_BY_ID);
      });

    } else
        return messageHelper.buildErrorMessage(ERR_DELETE_NOT_FOUND_BY_ID);

  });

}

module.exports = {
  getSpecies,
  getSpecieById,
  getSpecieByName,
  createSpecie,
  updateSpecie,
  deleteSpecie,
  ERR_CREATE_ALREADY_EXISTS_WITH_SAME_NAME,
  ERR_UPDATE_ALREADY_EXISTS_WITH_SAME_NAME,
  ERR_UPDATE_NOT_FOUND_BY_ID,
  ERR_DELETE_NOT_FOUND_BY_ID,
  ERR_DELETE_EXISTS_ASSOCIATED
}
