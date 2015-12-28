(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var registerCtrl = this;

        registerCtrl.register = register;

        function register() {
            registerCtrl.dataLoading = true;
            UserService.Create(registerCtrl.user)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashService.Error(response.message);
                        registerCtrl.dataLoading = false;
                    }
                });
        }
    }
})();
