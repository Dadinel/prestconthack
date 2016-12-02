(function () {
    'use strict';
    angular
        .module(global.config.APP_NAME)
        .controller('BillsController', Controller);

    Controller.$inject = ['$state', '$scope', 'BillService', 'BillModal'];

    function Controller($state, $scope, BillService, BillModal) {
        var controller = this;

        controller.bills = [];
        controller.haveMore = false;

        $scope.$on('appReady', function() {
            controller.init();
        });

        $scope.$on('actionMenuClicked', function() {
            BillModal.show()
            .then(function(newBill) {
                return BillService.addBill(newBill);
            })
            .then(function(result){
                controller.updateBills();
            })
            .catch(function(error){
                console.log(error)
            }
            )
        })

        controller.init = function() {
            console.log("controller initiated");
        }

        controller.openBill = function(bill) {
            $state.go('bills.detail', { billId : bill._id } );
        }

        controller.updateBills = function() {
            
            BillService.getBillsList()
            .then( function(result){
                    controller.bills = result;
                }
            )
            .catch(function(error){
                console.log("ERROR CONTROLLER");
                console.log(error);
            })
        }

        controller.enterSearchKey = function(keyEvent) {
            if (keyEvent.which === 13) {
                document.getElementById("search").blur();
            }
        }

        controller.updateBills();
    }
}());
