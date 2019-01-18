'use strict';

var _ = require('lodash');
var shortid = require('shortid');


var Pet = require('../models/pet.model');

//var specieRepository = require('../repositories/specie.repository');
var messageHelper = require('../helpers/message.helper');

const ERR_CREATE_ALREADY_EXISTS_WITH_SAME_NAME = 'It\'s not possible to create the pet. There is a pet with the same name in the system';
const ERR_UPDATE_ALREADY_EXISTS_WITH_SAME_NAME = 'It\'s possible to update the pet. There is a pet with the same name to update in the system';
const ERR_UPDATE_NOT_FOUND_BY_ID = 'It\'s not possible to update the pet. There is NOT a pet with the same id to update'
const ERR_DELETE_NOT_FOUND_BY_ID = 'It\'s not possible to delete the pet. Pet not found';
const ERR_DELETE_EXISTS_ASSOCIATED = 'It\' not possible to delete the pet. There may be some associated data';



async function createPet(req) {

  var pet = new Pet(req.body);
  pet.image = req.file.url;
  pet.thumb = req.file.url.replace('upload/', 'upload/c_thumb,w_200/');
  pet.id = shortid.generate();

  return await pet.save();

}



module.exports = {
  createPet,
  ERR_CREATE_ALREADY_EXISTS_WITH_SAME_NAME,
  ERR_UPDATE_ALREADY_EXISTS_WITH_SAME_NAME,
  ERR_UPDATE_NOT_FOUND_BY_ID,
  ERR_DELETE_NOT_FOUND_BY_ID,
  ERR_DELETE_EXISTS_ASSOCIATED
}
