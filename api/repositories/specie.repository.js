'use strict';

var _ = require('lodash');
var shortid = require('shortid');
var Specie = require('../models/specie.model');

function getSpecies(params) {

  var values = {};
  if (params.name !== undefined) {
    values =  { name: {$regex: params.name, $options:'i'} };
  }


  var sort = {};
  if (params.sort !== undefined) {
    if (params.sort === 'name') {
      sort = {name:'asc'};
    } else if (params.sort === '-name') {
      sort = {name:'desc'};
    }
  }


  return Specie.find(values).sort(sort).limit(1)
        .then(function(species) {
          return species;
        })
        .catch(function(err){
          return undefined;
  });

}

function getSpecieById(id) {
  return Specie.findOne( {id: id} )
        .then(function(specie) {
          return specie;
        })
        .catch(function(err){
          return undefined;
  });
}

function getSpecieByName(name) {

  return Specie.findOne( {name: name} )
        .then(function(specie) {
          if (specie == null)
            return undefined;
          else
            return specie;
        })
        .catch(function(err){
          return undefined;
  });
}

function createSpecie(specieP) {

  var specie = new Specie(
       {
          id: shortid.generate(),
          name: specieP.name
       }
   );

   return specie.save()
                .then(function (newSpecie) {
                            return getSpecieById(newSpecie.id).then(function(newSp) {
                                return newSp;
                            });
     })
   .catch(function(err){
       return undefined;
   });
}

function updateSpecie(specieP) {
  var idToSearch = specieP.id;

  return Specie.findOneAndUpdate({id: idToSearch}, {name: specieP.name}, {new: true} )
        .then(function(specie) {
          return specie;
        })
        .catch(function(err){
          return undefined;
  });
}

function deleteSpecie(id) {

  return Specie.deleteOne( {id: id} )
        .then(function(specie) {
          return true;
        })
        .catch(function(err){
          return false;
  });
}

function initDefaultSpecies(speciesSet) {
  //species = speciesSet.slice();
}

module.exports = {
  getSpecies,
  getSpecieById,
  getSpecieByName,
  createSpecie,
  updateSpecie,
  deleteSpecie,
  initDefaultSpecies
}
