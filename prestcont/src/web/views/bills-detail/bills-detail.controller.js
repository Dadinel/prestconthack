(function () {
    'use strict';
    angular
        .module(global.config.APP_NAME)
        .controller('BillDetailController', Controller);

    Controller.$inject = [
        '$scope',
        '$stateParams',
        '$filter',
        'BillService',
        '$http',
        '$state'
    ];

    function Controller($scope, $stateParams, $filter, BillService, $http, $state ) {
        var controller = this;

        // Controle de animação pois esta tela é de detalhes, e deve deslizar do lado, e não fazer o fade padrão.
        controller.anim = 'anim-slide-left';
        $scope.$on('animEnd', function($event, element, speed) {
            controller.anim = 'anim-slide-right';
        });

        controller.bill = BillService.getBill($stateParams.billId);

        controller.save = function(){
            var url = 'http://spon5044:8003/api/bills/' + controller.bill._id;
            var payload = {
                "finished" : true
            }

            var option = {
                headers: {
                    'Authorization' : 'alvaro'
                }
            };

            $http.put(url,payload,option)
            .then(function(result){
                console.log(result);
                $state.go('bills');
            },
                function(error){
                console.log(error);
                }
            );
        }
    }
}());
