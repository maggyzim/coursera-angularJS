(function(){
    'use strict';

    angular.module('myFirtApp', [])

    .controller('myFirstController', function ($scope){
        $scope.lmsg = "Click to assess items captured.";
        $scope.lmenu = "";

   $scope.check = function check(){

        if ($scope.lmenu==""){
            $scope.lmsg ="Please Enter Data First"
        } else {
         
        var item_array = $scope.lmenu.split(",");

        removeItem(item_array, '');
    
        if(item_array.length > 3){
            $scope.lmsg = "Too Much"
        } else {
            $scope.lmsg = "Enjoy"
        }
    }
   }
   })

   function removeItem(array, item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            }
    }
   }

})();