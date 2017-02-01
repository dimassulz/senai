 var app = angular.module('formApp', []);
 app.controller("cadastroCtrl", function ($scope) {
     var arrObjectUsuario = [
         {
             nome: "Fernanda",
             email: "fernanda@gmail.com",
             senha: "camaro123"
               },
         {
             nome: "João",
             email: "joao@gmail.com",
             senha: "joca123"
               },
         {
             nome: "Sebastião",
             email: "tiao@gmail.com",
             senha: "asdf123"
               },
         {
             nome: "Bianca",
             email: "bianca@gmail.com",
             senha: "bibi39978"
               },
         {
             nome: "Leonora",
             email: "leonora@gmail.com",
             senha: "leo3210"
               },
         {
             nome: "Henrique",
             email: "henrique@gmail.com",
             senha: "teste123"
               }
           ];

     $scope.verificarUsuario = function () {
         var encontrou = false;
         angular.forEach(arrObjectUsuario, function (object, indice) {
             if (object.email == $scope.email && object.senha == $scope.senha) {
                 encontrou = true;
                 bootbox.alert('Olá ' + object.nome + ' seja bem vindo!');
             }
         });
         if (encontrou === false) {
             bootbox.alert('Usuário ou senha não encontrados!');
         }
     };
 });