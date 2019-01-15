var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var shortid = require('shortid');
var User = require('../models/user.model');

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject(); //retornar objeto sin cosas
        const token = jwt.sign({ sub: user.id }, process.env.SECRET);
        return {
            ...userWithoutHash,
            token
        };
    }
}


async function create(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'The username "' + userParam.username + '" is taken';
    }

    var user = new User(userParam);
    user.id = shortid.generate();

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    return await user.save();
}


async function getById(id) {
    return await User.find({id:id}).select('-hash');
}


async function update(id, userParam) {
    const user = await User.find({id:id});

    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'The username "' + userParam.username + '" is taken';
    }

    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    Object.assign(user, userParam);

    return await user.save();
}

async function remove(id) {
    await User.findByIdAndRemove(id);
}

module.exports = {
    authenticate,
    create,
    getById,
    update,
    remove
};
