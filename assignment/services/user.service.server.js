/**
 * Created by Rizwan Mohamed on 11/6/2016.
 */
module.exports = function(app, model){
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
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function createUser(req, res){
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(function(newUser) {
                    res.send(newUser);
                },
                function(error)
                {
                    res.sendStatus(400).send(error);
                }

            );

    }

    function updateUser(req, res)
    {
        var user = req.body;
        var userId = req.params.uid;
        model
            .userModel
            .updateUser(userId, user)
            .then(function(status) {
                res.sendStatus(status);


            }, function(error) {
                res.sendStatus(400).send(error);

            });
    }

    function deleteUser(req, res)

    {
        var userId = req.params.uid;
        model
            .userModel
            .deleteUser(userId)
            .then(function(status){
                res.sendStatus(200);


            }, function(error){
                res.sendStatus(400).send(error);

            });
    }

    function findUser(req,res)
    {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(function(users){
                if(users)
                {
                    res.json(users[0]);
                }

                else
                {
                    res.send('0');
                }
            } , function(error){
                res.sendStatus(400).send(error);
            });
    }

    function findUserByUsername(req, res)
    {
        var userName = req.query.username;
        model
            .userModel
            .findUserByUserName(userName)
            .then(function(users){
                if(users)
                {
                    res.json(users[0]);
                }

                else
                {
                    res.send('0');
                }
            }, function(error){
                res.sendStatus(400).send(error);
            })
    }

    function findUserByCredentials(req, res)
    {
        var userName = req.query.username;
        var userPassword = req.query.password;
        model
            .userModel
            .findUserByCredentials(userName, userPassword)
            .then(function(users){
                if(users)
                {
                    res.json(users[0]);
                }
                else
                {
                    res.send('0');
                }


            }, function(error){

                res.sendStatus(400).send(error);
            })
    }

    function findUserById(req, res)
    {
        var userId = req.params.uid;
        model
            .userModel
            .findUserById(req.params.uid)
            .then(function(user){

                    if(user)
                    {
                        res.send(user);
                    }

                    else
                    {
                        res.send('0');
                    }
                },
                function(error)
                {
                    res.sendStatus(400).send(error);
                }
            )
    }
}