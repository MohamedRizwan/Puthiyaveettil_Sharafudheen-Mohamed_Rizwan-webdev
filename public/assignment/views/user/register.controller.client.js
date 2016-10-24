/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser() {
            var createdUser = {
                username: vm.username,
                password1: vm.password1,
                password2: vm.password2,
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email
            };

            if (potentialUser.password1 === createdUser.password2) {
                var newUser = {
                    username: vm.username,
                    password: vm.password1,
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    email: vm.email
                };

                var userExists = UserService.createUser(newUser);

                if (userExists === null) {
                    alert("User exists");
                }

                else {
                    var userId = userExists._id;
                    vm.userId = userId;
                    vm.registerUser = userExists;
                    $location.url("/user/" + vm.userId);
                }
            } else
                vm.error = "Passwords Do not match, please try again";

        }

    }
})();