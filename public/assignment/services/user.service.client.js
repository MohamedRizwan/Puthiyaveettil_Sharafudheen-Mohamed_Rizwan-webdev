/**
 * Created by Rizwan Mohamed on 10/18/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
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

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser

        };
        return api;

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function findUserById(userId) {
            for (var u in users) {
                var user = users[u];
                if (parseInt(user._id) === userId) {
                    return user;
                }
            }
            return null;
        }


        function createUser(newUser) {
            var userExists = false;
            /*var newUser = null;*/
            /*for (var u in users) {
                var user = users[u];
                if (user.username === newUser.username) {
                    userExists = true;
                    return null;
                }
            }*/

            var newId = parseInt(users[users.length - 1]._id) + 1;
            var newUser = {
                _id: newId.toString(),
                username: newUser.username,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            };
            users.push(newUser);
            return newUser._id;
        }

        function findUserByUsername(username) {
            var user = null;
            for (var u in users) {
                user = users[u];
                if (user.username === username) {
                    return user;
                }
            }
            return user;
        }

        function updateUser(userId, newUser) {
            var user;
            for (var u in users) {
                user = users[u];
                if (parseInt(user._id) === userId) {
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    user.email = newUser.email;
                    return user;
                }
            }
            return user;
        }

        function deleteUser(userId) {
            var i;
            var found = false;
            for (i in users) {
                if (users[i]._id.toString() === userId.toString()) {
                    found = true;
                    break;
                }
            }

            if (found) {
                users.splice(i, 1);
                return true;
            }
            return false;
        }
    }
})();