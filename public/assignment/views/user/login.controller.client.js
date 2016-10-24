/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if (user === null) {
                vm.error = "No such user";
            }
            else {
                $location.url("/user/" + user._id);
                vm.success = "Your Profile was successfully saved!";
            }
            var userByName = UserService.findUserByUsername(username);
        }

    }
})();