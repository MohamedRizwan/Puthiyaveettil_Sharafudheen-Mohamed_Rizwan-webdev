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
            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function (user) {
                    if (user === '0') {
                        vm.error = "No such user";
                    }
                    else {
                        $location.url("/user/" + user._id);
                        vm.success = "Your Profile was successfully saved!";
                    }

                })
                .error(function (err) {
                    console.log(err);
                })

        }

    }
})();

