/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService)
    {
        var vm = this;
        vm.registerUser = registerUser;

        function registerUser() {
            var potentialUser = {
                username: vm.username,
                password1: vm.password1,
                password2: vm.password2,
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.email
            };

            if (potentialUser.password1 === potentialUser.password2) {
                var newUser = {
                    username: vm.username,
                    password: vm.password1,
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    email: vm.email
                };

                var userId = UserService.createUser(newUser);
                vm.userId = userId;
                //vm.registerUser = userExists;
                $location.url("/user/" + userId);
                /*if (user === null) {
                    alert("User exists");
                }else {
                    var userId = userExists._id;
                    vm.userId = userId;
                    vm.registerUser = userExists;
                    $location.url("/user/" + userId);
                }*/
            }

            else vm.error = "Passwords Do not match, please try again";

        }

    }
})();