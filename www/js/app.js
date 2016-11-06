// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('mainController', function ($scope, $ionicPopup, $ionicListDelegate){
    var ListaAtividades = new getListaAtividades();

    $scope.lista = ListaAtividades.items;
    $scope.mostraMarcados = false;
    $scope.removeStatus = false;


    function getItem(item, novo){
      $scope.data = {};
      $scope.data.newListaAtividades = item.nome;


      $ionicPopup.show({
        title: "Nova Tarefa",
        scope: $scope,
        template: "<input type='text' placeholder='Escreva a tarefa...' autofocus='true' ng-model='data.newListaAtividades'>",
        buttons: [
          {text: "Ok",
          onTap: function(e){
            item.nome = $scope.data.newListaAtividades;
            if (novo) {
              ListaAtividades.adicionar(item);
            }

          }},
          {text: "Cancelar"}
        ]
      });

      $ionicListDelegate.closeOptionButtons();
    };


    $scope.onMarcaItem = function(item){
      item.finalizada = !item.finalizada;
    };

    $scope.onEscondeItem = function(item){
      return item.finalizada && !$scope.mostraMarcados;
    };

    $scope.onAdicionaItem = function(){
      var item  = {nome:"", finalizada: false};
      getItem(item, true);
    };

    $scope.onEditaItem = function(item){
      getItem(item, false);
    };

    $scope.onRemoveItem = function(item){
      ListaAtividades.remove(item);
    };

    $scope.onClickRemove = function(){
      $scope.removeStatus = !$scope.removeStatus;
    }
});
