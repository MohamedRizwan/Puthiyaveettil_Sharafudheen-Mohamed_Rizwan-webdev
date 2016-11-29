/**
 * Created by Rizwan Mohamed on 10/19/2016.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        console.log(vm.userId);
        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function user(user) {


                    if (user != '0') {
                        vm.user = user;
                        console.log("found user");
                    }
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        init();

        vm.updateUser = updateUser;
        function updateUser() {
            console.log(vm.user);
            var promise = UserService.updateUser(userId, vm.user);
            promise
                .success(function (updatedUser) {
                    $location.url("/user/" + userId);
                    vm.success = "Your profile was successfully saved."
                })
                .error(function (error) {
                    console.log(error);
                })
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
/*(function () {
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
 })();*/
