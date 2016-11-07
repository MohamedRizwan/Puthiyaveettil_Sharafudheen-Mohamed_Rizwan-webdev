/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        vm.userId = userId;
        function init() {
            var promise = UserService.findUserById(userId);
            promise
                .success(function user(user) {
                    if (user != '0') {
                        vm.user = user;
                        console.log("found user");
                    }
                })
                .error(function (failure) {
                    console.log(failure);
                })
        }

        init();

        vm.updateUser = updateUser;
        function updateUser() {
            var updatedUser = UserService.updateUser(vm.user);
            $location.url("/user/" + userId);
        }


        vm.deleteUser = deleteUser;
        function deleteUser() {
            var promise = UserService.deleteUser(vm.user._id);
            promise
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {

                })
        }
    }
})();
