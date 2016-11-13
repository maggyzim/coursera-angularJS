(function () {
    'use strict';

    //define application components
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('UrlPath',"https://davids-restaurant.herokuapp.com/menu_items.json");
    
    //define Found Items directive
    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          found: '<',
        },
        // controller: 'ShoppingListDirectiveController as list',
        controller: NarrowItDownController,
        controllerAs: 'nController',
        bindToController: true
      };

      return ddo;
    }
    
    //define Narrow It Down controller with service parameter
    NarrowItDownController.$inject=['MenuSearchService'];
    function NarrowItDownController(MenuSearchService){
        var nController = this;
        
        //initialise menu list array
        nController.menu = [];
        
        //define search function to narrow menu based on preference
        nController.search = function (searchTerm) {
           
            if (searchTerm){
                //Define promise with http call
                var promise = MenuSearchService.getMatchedMenuItems();

                //if promise returns successfully
                promise.then(function (retObj) {
                    nController.menu = retObj.data.menu_items;

                    //loop and remove non-matching items
                    for (var i=nController.menu.length-1; i>=0; i--) {
                        if (!nController.menu[i].description.includes(searchTerm)) {
                            nController.menu.splice(i, 1);
                        }
                    }
                })
                //If promise fails
                .catch(function (error) {
                    console.log("Something went terribly wrong.");
                });
            }
        }
        
        //define dont want removal function
        nController.nope = function (itemIndex) {
            nController.menu.splice(itemIndex,1);
        }

    }

    //define Menu Search service
    MenuSearchService.$inject = ['$http', 'UrlPath']; 
    function MenuSearchService($http, UrlPath) {
        //initial servce instance
        var mService = this;
        
        mService.getMatchedMenuItems = function () {
            
           var response = $http({
            method: "GET",
            url: (UrlPath)
            });

            return response;
        };

    };
    
})();