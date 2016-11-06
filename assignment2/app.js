(function () {
    'use strict';

    //define application components
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    //define to buy array controller
    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuy = this;

        //set to buy array to service to buy array function
        toBuy.toBuyArray = ShoppingListCheckOffService.getToBuy();
        
        //set to buy function to to buy function on service with params
        toBuy.buy = function (itemIndex) {
            ShoppingListCheckOffService.buy(itemIndex);
        };
        
        toBuy.add = function (qty, add_item) {
            toBuy.toBuyArray.push({qty: qty,item: add_item});
        };
    }
    
    //define bought controller with service parameter
    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var alBought = this;
        
        //set bought array for controller to service function
        alBought.alBoughtArray = ShoppingListCheckOffService.getBought();
        
        //set to buy function to return function on service with params
        alBought.return = function (itemIndex) {
            ShoppingListCheckOffService.return(itemIndex);
        };
     }

    //define service
    function ShoppingListCheckOffService() {
        //initial servce instance
        var service = this;
        
        //initial arrays with bought and to buy items
        var toBuyArray = [{qty: 11,item: 'Cookies'}, {qty: 1,item: 'mop'}, {qty: 3,item: 'Coke Zero'}];
        var alBoughtArray = [];
        var item = [];

        //set function to effect buying action
        service.buy = function (itemIndex) {
            item = toBuyArray.splice(itemIndex,1);
            alBoughtArray.push(item[0]);
        };
        
        //set function to return bought item
        service.return = function (itemIndex) {
            item = alBoughtArray.splice(itemIndex,1);
            toBuyArray.push(item[0]);
        };

        //return to buy array
        service.getToBuy = function () {
            return toBuyArray;
        };
        
        //return bought array
        service.getBought = function () {
            return alBoughtArray;
        };        
    }
    
})();