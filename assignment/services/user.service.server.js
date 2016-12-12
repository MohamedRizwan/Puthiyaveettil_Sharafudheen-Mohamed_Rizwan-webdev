/**
 * Created by Rizwan Mohamed on 11/6/2016.
 */
module.exports = function (app, model) {
    /*    var users = [
     {_id: "123", username: "alice", password: "alice",
     firstName: "Alice", lastName: "Wonder", email: "alice@wonderland.com"},
     {_id: "234", username: "bob", password: "bob",
     firstName: "Bob", lastName: "Marley", email: "bob@marley.com"},
     {_id: "345", username: "charly", password: "charly",
     firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com"},
     {_id: "456", username: "jannunzi", password: "jannunzi",
     firstName: "Jose", lastName: "Annunzi", email: "jose@annunzi.com"}
     ];*/

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };

    var googleConfig = {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    };

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post('/api/loggedin', loggedin);
    app.post('/api/register', register);

    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    //app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));


    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    return done(error);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    /* function createUser(req, res) {
     var user = req.body;
     model
     .userModel
     .createUser(user)
     .then(function (newUser) {
     res.send(newUser);
     },
     function (error) {
     res.sendStatus(400).send(error);
     }
     );

     }*/

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params.uid;
        model
            .userModel
            .updateUser(userId, user)
            .then(function (status) {
                res.sendStatus(status);


            }, function (error) {
                res.sendStatus(400).send(error);

            });
    }

    function deleteUser(req, res) {
        var userId = req.params.uid;
        model
            .userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);


            }, function (error) {
                res.sendStatus(400).send(error);

            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(function (users) {
                if (users) {
                    res.json(users[0]);
                }

                else {
                    res.send('0');
                }
            }, function (error) {
                res.sendStatus(400).send(error);
            });
    }

    function findUserByUsername(req, res) {
        var userName = req.query.username;
        model
            .userModel
            .findUserByUserName(userName)
            .then(function (users) {
                if (users) {
                    res.json(users[0]);
                }

                else {
                    res.send('0');
                }
            }, function (error) {
                res.sendStatus(400).send(error);
            })
    }

    function findUserByCredentials(req, res) {
        var userName = req.query.username;
        var userPassword = req.query.password;
        model
            .userModel
            .findUserByCredentials(userName, userPassword)
            .then(function (users) {
                if (users) {
                    res.json(users[0]);
                }
                else {
                    res.send('0');
                }


            }, function (error) {

                res.sendStatus(400).send(error);
            })
    }

    function findUserById(req, res) {
        var userId = req.params.uid;
        model
            .userModel
            .findUserById(req.params.uid)
            .then(function (user) {

                    if (user) {
                        res.send(user);
                    }

                    else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model
                            .userModel
                            .createUser(newFacebookUser)
                            .then(
                                function (user) {
                                    return done(null, user);
                                },
                                function (err) {
                                    return done(err);
                                }
                            )
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        model
            .userModel
            .findUserByGoogleId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return model
                            .userModel
                            .createUser(newGoogleUser)
                            .then(
                                function (user) {
                                    return done(null, user);
                                },
                                function (err) {
                                    return done(err);
                                }
                            );
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }
}