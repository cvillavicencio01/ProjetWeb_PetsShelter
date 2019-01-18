
const express = require('express');
const router = express.Router();

var controllerHelper = require('../helpers/controller.helper');
var petService = require('../services/pet.service');
const MODULE_NAME = '[PetImage Controller]';


var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
var multer = require('multer');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "demo",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

var upload = multer({ storage: storage }).single("image");


router.post('/pets', createPet);

module.exports = router;

function createPet(req, res, next){

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      controllerHelper.handleErrorResponse(MODULE_NAME, createPet.name, err, res);
    } else if (err) {
      controllerHelper.handleErrorResponse(MODULE_NAME, createPet.name, err, res);
    }
    console.log(req);

    petService.createPet(req).then(pet => pet ? res.json(pet) : res.status(400).json({ message: 'Create pet error' }) );
  });

};
