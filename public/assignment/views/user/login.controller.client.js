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
        //function login(username, password) {
        function login(user) {
            if (!(user.username && user.password)) {
                vm.error = "Please enter username and password.";
                return;
            }
            vm.username = user.username;
            vm.password = user.password;
            //var promise = UserService.findUserByCredentials(username, password);
            var promise = UserService.login(user);
            promise.success(function (user) {
                if (user === '0') {
                    vm.error = "No such user";
                } else {
                    $location.url("/user/" + user._id);
                }
            })
                .error(function (err) {
                    if (err === "Unauthorized") {
                        vm.error = "No such user";
                    }
                    console.log("Error logging in!");
                    console.log(err);
                });
            /*.success(function (user) {
             /!*console.log(aaa);*!/
             if (user) {
             $location.url("/user/" + user._id);
             vm.success = "Your Profile was successfully saved!";
             }
             else {
             vm.error = "No such user";
             }
             })
             .error(function (err) {
             console.log(err);
             })*/
        }
    }
})();