/**
 * Created by Rizwan Mohamed on 11/6/2016.
 */
module.exports = function (app) {
    var users = [
        {
            _id: "123", username: "alice", password: "alice",
            firstName: "Alice", lastName: "Wonder", email: "alice@wonderland.com"
        },
        {
            _id: "234", username: "bob", password: "bob",
            firstName: "Bob", lastName: "Marley", email: "bob@marley.com"
        },
        {
            _id: "345", username: "charly", password: "charly",
            firstName: "Charly", lastName: "Garcia", email: "charly@garcia.com"
        },
        {
            _id: "456", username: "jannunzi", password: "jannunzi",
            firstName: "Jose", lastName: "Annunzi", email: "jose@annunzi.com"
        }
    ];
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);
        res.send(user);
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params['uid'];
        for (var u in users) {
            if (users[u]._id == userId) {
                users[u] = user;
            }
        }
        res.send(200);
    }

    function deleteUser(req, res) {
        var userId = req.params['uid'];
        for (var u in users) {
            if (users[u]._id == userId) {
                users.splice(u, 1);
            }
        }
        res.send(200);
    }

    function findUser(req, res) {
        var query = req.query;

        if (query.username && query.password) {
            findUserByCredentials(req, res);
        } else if (query.username) {
            findUserByUsername(req, res);
        } else{
            res.send(users);
        }
    }

    function findUserByUsername(req, res) {
        var userName = req.query.username;
        for (var u in users) {
            if (users[u].username === userName) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByCredentials(req, res) {
        var userName = req.query.username;
        var userPassword = req.query.password;
        for (var u in users) {
            if ((users[u].username === userName) && (users[u].password === userPassword)) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserById(req, res) {
        var userId = parseInt(req.params.uid);
        for (var u in users) {
            if (parseInt(users[u]._id) === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }
};