var app = angular.module('combustivelApp', ['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {
$locationProvider.html5Mode(true);
$routeProvider.when("/", {
        templateUrl: 'view/main.html',
        controller: 'calcCtrl'
    })
    .when("/m", {
        templateUrl: 'view/media.html',
        controller: 'calcCtrl'
    })
    .when("/mkm", {
        templateUrl: 'view/mediakm.html',
        controller: 'calcCtrl'
    })
    .when("/d", {
        templateUrl: 'view/dinheiro.html',
        controller: 'calcCtrl'
    })
    .when("/l", {
        templateUrl: 'view/litros.html',
        controller: 'calcCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
app.controller('calcCtrl', function ($scope) {
    $scope.mostraCalculo = false; 
    //Calcular 1)
    $scope.calcularMediaLitro = function () {
        if (!$scope.kmrodados) {
            return false;
        }
        if (!$scope.litros) {
            return false;
        }
        if (!$scope.vlitro) {
            return false;
        }

        $scope.media = parseFloat($scope.kmrodados/$scope.litros).toFixed(2);
        $scope.mostraCalculo = true;
        $scope.gasto = parseFloat($scope.litros*$scope.vlitro).toFixed(2);
    };
    //Calcular 2)
    $scope.calcularMediaKm = function () {
        if (!$scope.kminicial) {
            return false;
        }
        if (!$scope.kmfinal) {
            return false;
        }
        if (!$scope.litros) {
            return false;
        }
        if (!$scope.vlitro) {
            return false;
        }

        $scope.media = parseFloat(($scope.kmfinal-$scope.kminicial)/$scope.litros).toFixed(2);
        $scope.mostraCalculo = true;
        $scope.gasto = parseFloat($scope.litros*$scope.vlitro).toFixed(2);
    };
    //Calcular 3)
    $scope.calcularMediaDinheiro = function () {
        if (!$scope.mediakm) {
            return false;
        }
        if (!$scope.kmrodados) {
            return false;
        }
        if (!$scope.vlitro) {
            return false;
        }

        $scope.media = parseFloat($scope.kmrodados/$scope.mediakm).toFixed(2);
        $scope.mostraCalculo = true;
        $scope.gasto = parseFloat(($scope.kmrodados/$scope.mediakm)*$scope.vlitro).toFixed(2);
    };
    //Calcular 4)
    $scope.calcularMediaLitros = function () {
        if (!$scope.vabast) {
            return false;
        }
        if (!$scope.vlitro) {
            return false;
        }

        $scope.media = parseFloat($scope.vabast/$scope.vlitro).toFixed(3);
        $scope.mostraCalculo = true;
    };
    //Botão limpar
    $scope.limpar = function(){
        $scope.mediakm = '';
        $scope.kmrodados = '';
        $scope.vabast = '';
        $scope.vlitro = '';
        $scope.kminicial = '';
        $scope.kmfinal = '';
        $scope.litros = '';
        $scope.mostraCalculo = false;
    };
   
});