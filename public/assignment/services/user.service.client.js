/**
 * Created by Rizwan Mohamed on 10/18/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
        return api;

        function findUserById(userId) {
            for(var u in users) {
                var user = users[u];
                if(parseInt(user._id) === userId) {
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if(    user.username === username
                    && user.password === password) {
                    return user;
                }
            }
            return null;
        }

        function createUser(newUser) {
            for(var u in users){
                var user = users[u];
                if(user.username === newUser.username){
                    return null;
                }
            }

            var newId = parseInt(user[users.length - 1]._id) + 1;
            var newUserEntry = { _id: newId,
                username: newUser.username,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email};

            users.push(newUserEntry);
            return newUserEntry;
        }

        function findUserByUsername(username) {
            for(var u in users) {
                var user = users[u];
                if(user.username === username) {
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for(var u in users) {
                var existingUser = users[u];
                if(existingUser._id === userId) {
                    users[u] = user;
                }
            }
        }

        function deleteUser(userId) {
            var i;
            var found = false;
            for(i in users)
            {
                if(users[i]._id.toString() === userId.toString())
                {
                    found = true;
                    break;
                }
            }

            if(found)
            {
                users.splice(i,1);
                return true;
            }
            return false;
        }

    }
})();