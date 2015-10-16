angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('UsuarioslistsCtrl', function($scope, $http) {

  $scope.usuarios = [];

  $scope.$on('$ionicView.beforeEnter', function() {
    
    $http.get('http://localhost:8888/api-prog4/usuario').then(function(resp) {
      $scope.usuarios = resp.data.data;
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  });

    
})

.controller('UsuarioCtrl', function($scope, $stateParams, $http, $location) {

  $scope.usuario = {};

  $http.get('http://localhost:8888/api-prog4/usuario/'+ $stateParams.UsuarioId).then(function(resp) {
    $scope.usuario = resp.data.data;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 

  $scope.doSave = function() {
    $http.put('http://localhost:8888/api-prog4/usuario/'+ $stateParams.UsuarioId, $scope.usuario).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/usuarios');
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  };

  $scope.doDelete = function() {
    $http.delete('http://localhost:8888/api-prog4/usuario/'+ $stateParams.UsuarioId, $scope.usuario).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/usuarios');
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  };
  
});
