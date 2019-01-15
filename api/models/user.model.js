var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    _id: {
        select: false,
        type: ObjectId,
        default: mongoose.Types.ObjectId
    },
    id: {type: String, required: true},
    username: { type: String, unique: true, required: true },
    email: {type: String, unique: true, required: true},
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
}, { versionKey: false});

module.exports = mongoose.model('User', UserSchema);
