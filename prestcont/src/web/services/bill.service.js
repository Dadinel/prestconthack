(function () {
    'use strict';
    angular
    .module(global.config.APP_NAME)
    .service('BillService', Service);

    Service.$inject = ['$q', '$uibModal','$http'];

    function Service($q, $uibModal, $http) {
        var service = this;

        service.bills = [
            {
                name: "Alvaro",
                uDate:"06/11/1987"
            },
            {
                name: "Daniel",
                uDate:"06/11/1987"
            }

        ]

        
        service.url = 'xxx';

        service.option = {
                headers: {
                    'Authorization' : 'alvaro'
                }
            };

        service.getBillsList = function() {
                       
            var deferred =$q.defer();  
            deferred.resolve(service.bills);
/*
            $http.get(service.url, service.option)
            .then(function(result){
                console.log("Result");
                console.log(result);

                service.bills =result.data.bills;

                for( var i = 0; i < service.bills.length ; i++ ){
                    service.bills[i].uDate = service.beautify(service.bills[i].date);
                }

                deferred.resolve(service.bills);

            }
            , function(error){
                console.log("Error");
                console.log(error);       

                deferred.reject(error);        
            });
*/
            return deferred.promise;
            //return bills
        }

        service.addBill = function(bill) {
            if( !bill || !bill.name || !bill.date ){
                return null;
            }

            var deferred = $q.defer();
                
            $http.post(service.url,bill,service.option)
            .then(function(result){
                console.log(result);
                deferred.resolve(result);
            },
                function(error){
                console.log(error);
                deferred.reject(error);
                }
            );

            return deferred.promise;

        }

        service.beautify = function(data) {
            var data = new Date(data);
            var dia = data.getDate();

            if (dia.toString().length == 1)
              dia = "0"+dia;

            var mes = data.getMonth()+1;
            if (mes.toString().length == 1)
              mes = "0"+mes;

            var ano = data.getFullYear();

            return dia+"/"+mes+"/"+ano;
        }

        service.completeBill = function(billIndex) {
            service.bills.splice(billIndex, 1);
        }

        service.getBill = function(billId) {
            for(var i = 0; i < service.bills.length; i++ ) {
                if( service.bills[i]._id == billId ) {
                    return service.bills[i];
                }
            }
            return null;
        }
    }

}());
