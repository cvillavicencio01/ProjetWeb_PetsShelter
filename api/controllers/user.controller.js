const userService = require('../services/user.service');

function authenticate(req, res) {
    userService.authenticate(req.body)
        .then(user =>
          user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }));
}

function register(req, res) {
    userService.create(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Register error' }) );
}


function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404));
}

function getById(req, res) {
    userService.getById(req.swagger.params.id.value)
        .then(user => user ? res.json(user) : res.sendStatus(404));
}

function update(req, res) {
    userService.update(req.swagger.params.id.value, req.body)
        .then(() => res.json({}));
}

function remove(req, res) {
    userService.remove(req.swagger.params.id.value)
        .then(() => res.json({}));
}


module.exports = {
  authenticate,
  register,
  getCurrentUser,
  getById,
  update,
  remove
}
