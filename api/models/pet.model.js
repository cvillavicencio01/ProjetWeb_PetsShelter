var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var PetSchema = new Schema({
    _id: {
        select: false,
        type: ObjectId,
        default: mongoose.Types.ObjectId
    },
    id: {type: String, required: true},
    name: {type: String, required: true, max: 100},
    specie: {type: String, required: true, max: 100},
    breed: {type: String, required: false, max: 100},
    lat: { type: Number, required: false},
    lon: { type: Number, required: false},
    lostDate: {type: Date, required: false},
    status: {type:String, required: true},
    description: {type:String, required: false, max:300},
    image: {type:String, required: false},
    thumb: {type:String, required: false},
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false});

module.exports = mongoose.model('Pet', PetSchema);
