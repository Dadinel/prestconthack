(function () {
    'use strict';
    angular
    .module(global.config.APP_NAME)
    .service('BillService', Service);

    Service.$inject = ['$q', '$uibModal','$http'];

    function Service($q, $uibModal, $http) {
        var service = this;
        
        //service.bills

        service.bills = [
            {
                _id:1,
                name: "Alvaro",
                value:"R$30.000,00",
                date:"06/11/1987",
                desc:"Descricao da conta"
                
            },
            {
                _id:2,
                name: "Daniel",
                value:"R$35.000,00",
                date:"06/12/1987",
                desc:"Descricao da conta do Daniel"
            }

        ]

        
        service.url = 'http://172.16.35.41:8080/Rest/PrestCont';

        service.option = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Daniel"
                }
            };

        service.getBillsList = function() {
                       
            var deferred =$q.defer();  
            deferred.resolve(service.bills);
            //:TODO:
            /*var url = service.url + '/84a322e2a4ed4000804Bdb08edc06f98'

            $http.get(url, service.option)
            .then(function(result){
                console.log("Result");
                console.log(result);

                service.bills = result.data.bills;

                for( var i = 0; i < service.bills.length ; i++ ){
                    service.bills[i].Date = service.beautify(service.bills[i].date);
                }

                deferred.resolve(service.bills);

            }
            , function(error){
                console.log("Error!!!");
                console.log(error);       

                deferred.reject(error);        
            });*/

            return deferred.promise;
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
