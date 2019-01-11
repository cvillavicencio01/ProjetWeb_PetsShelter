var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var SpecieSchema = new Schema({
    _id: {
        select: false,
        type: ObjectId,
        default: mongoose.Types.ObjectId
    },
    id: {type: String, required: true},
    name: {type: String, required: true, max: 100},
}, { versionKey: false});


module.exports = mongoose.model('Specie', SpecieSchema);
