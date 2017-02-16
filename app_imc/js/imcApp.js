var app = angular.module('imcApp', ['ngRoute']);
//app.config(function ($routeProvider, $locationProvider) {
$locationProvider.html5Mode(true);
$routeProvider.when("/", {
        templateUrl: 'view/main.html',
        controller: 'calculoCtrl'
    })
    .when("/masculino", {
        templateUrl: 'view/male.html',
        controller: 'calculoCtrl'
    })
    .when("/feminino", {
        templateUrl: 'view/female.html',
        controller: 'calculoCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
app.controller('calculoCtrl', function ($scope) {
    $scope.mostraCalculo = false; //minha div escondida
    $scope.calcular = function () {
        if (!$scope.peso) {
            return false; //se não existir peso não consegue fazer o calculo
        }
        if (!$scope.altura) {
            return false; //se não existir altura não consegue fazer o calculo
        }
        $scope.resultIMC = parseFloat($scope.peso / Math.pow(($scope.altura / 100), 2)).toFixed(2);
        //parseFloat().toFixed(2) fixou em 2 casas decimais o calculo.
        $scope.mostraCalculo = true; //minha div aparece
    };
    $scope.mostrarTipoIMCMasculino = function () {
        if ($scope.resultIMC < 20.7) {
            return 'Abaixo do peso';
        } else if ($scope.resultIMC >= 20.7 && $scope.resultIMC <= 26.4) {
            return 'no Peso Ideal';
        } else if ($scope.resultIMC >= 26.5 && $scope.resultIMC <= 27.8) {
            return 'um Pouco Acima do Peso';
        } else if ($scope.resultIMC >= 27.9 && $scope.resultIMC <= 31.1) {
            return 'Acima do Peso';
        } else {
            return 'em Obesidade';
        }
    };

    $scope.calcularPesoIdealMasculino = function () {
        return parseFloat(($scope.altura - 100) * 0.93).toFixed(2);
    }

    $scope.mostrarTipoIMCFeminino = function () {
        if ($scope.resultIMC < 19.1) {
            return 'Abaixo do peso';
        } else if ($scope.resultIMC >= 19.1 && $scope.resultIMC <= 25.8) {
            return 'Peso Ideal';
        } else if ($scope.resultIMC >= 25.9 && $scope.resultIMC <= 27.3) {
            return 'Pouco Acima do Peso';
        } else if ($scope.resultIMC >= 27.4 && $scope.resultIMC <= 32.3) {
            return 'Acima do Peso';
        } else {
            return 'Obesidade';
        }
    };

    $scope.calcularPesoIdealFeminino = function () {
        return parseFloat(($scope.altura - 100) * 0.83).toFixed(2);
    }

});