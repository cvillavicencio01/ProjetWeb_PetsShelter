const expressJwt = require('express-jwt');
const userService = require('../services/user.service');

function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret, isRevokedCallback }).unless({
        path: [
            '/authenticate',
            '/register',
            '/docs/#/',
            '/docs/#',
            '/docs/',
            '/docs',
            '/docs/swagger-ui.css',
            '/docs/swagger-ui-bundle.js',
            '/docs/swagger-ui-standalone-preset.js',
            '/docs/swagger-ui-bundle.js.map',
            '/docs/swagger-ui.css.map',
            '/docs/swagger-ui-standalone-preset.js.map',
            '/api-docs'
        ]
    });
}

function isRevokedCallback(req, payload, done) {
    return userService.getById(payload.sub).then(function(user){
        if (!user) {
            return done(null, true);
          }

          done();
    });

};

module.exports =  jwt;
