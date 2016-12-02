(function () {
    'use strict';
    angular
    .module(global.config.APP_NAME)
    .controller('SettingsController', Controller);

    Controller.$inject = [
        '$scope',
        '$filter',
        '$state',
        'NotificationService'
    ];

    function Controller($scope, $filter, $state, NotificationService) {
        var controller = this;

        controller.scan = function(){
            console.log('click');

            channel.barCodeScanner()
            .then(function(result) {
                controller.code = result;
            })
            .catch(function(error){
                console.log(error);
            }

            )
        }

    }
}());
