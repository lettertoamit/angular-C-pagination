 


/**************************Shopping Cart ********************************/

var Administrator = angular.module('adminApp', []);

Administrator.controller('Standard', ['$scope','$http', function ($scope, $http) { 
    $scope.StandardJson = {};
    $scope.StandardCount = 0;
    $scope.perpage = 10;
    $scope.skip = 0;
    $scope.page = 0;
    $scope.name;
    $scope.init = function (a){
        $scope.name = a; 
        $scope.pagex();
        $scope.getCount();
    }
    $scope.numberOfPages = function () {
        return Math.ceil($scope.StandardCount / $scope.perpage);
    }
    $scope.increment = function () {
        $scope.page++;
        if ($scope.page > $scope.numberOfPages()-1) {
            $scope.page = $scope.numberOfPages()-1;
        }
    }
    $scope.decrement = function () {
        $scope.page--;
        if ($scope.page < 0) {
            $scope.page = 0;
        }
    }
    $scope.assign = function (a) {
        $scope.page = a-1; 
    } 
    $scope.pagex = function () { 
        console.log($scope.name, "pagex");
        $http.get("/administrator/AdminAjax/" +$scope.name+"sbyPage?take=" + $scope.perpage + "&skip=" + $scope.page * $scope.perpage )
            .then(function (response) {
                $scope.StandardJson = JSON.parse(response.data);
            });
    }; 
    $scope.getCount = function () {
        $http.get("/administrator/AdminAjax/" + $scope.name + "sCount?take=" + $scope.perpage + "&skip=" + $scope.skip * $scope.page)
            .then(function (response) {
                $scope.StandardCount = JSON.parse(response.data);
            });
    }
}]);

Administrator.filter('range', function () {
    return function (input,total) { 
        var input = new Array();
        total = parseInt(total); 
        for (var i = 0; i < total; i++) {
            input.push(i+1);
        } 
        return input;
    };
});

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
Administrator.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

 
 
//var rootApp = angular.module('rootApp', ['rightpannel', 'Homex', 'product', 'FooterBrand', 'shoppingcart', 'MyAccount', 'getshoppingcart','updateprofile']);
 