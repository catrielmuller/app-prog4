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

.controller('HomeCtrl', function($rootScope, $scope, $http, $cordovaFacebook) {

  console.log('LoadHome');
  if($rootScope.user) {
    $scope.user = $rootScope.user;
  } else {
    $scope.user = {};
    $scope.user.picture = '';
    $scope.user.name = 'Nombre';
    $scope.user.email = 'Email';
    $scope.user.id = '';
  }
  

  $scope.doShare = function() {
    FB.ui({
      method: 'share',
      href: 'http://netflix.com/'
    }, function(response){});
  };

  $scope.doLogin = function() {
     $cordovaFacebook.login(["public_profile", "email", "user_friends"]).then(function(success) {
        
        console.log(success);

        $cordovaFacebook.api("me?fields=id,name,picture{url},email", ["public_profile", "email"]).then(function(data) {
            console.log(data);

            $scope.user.picture = data.picture.data.url;
            $scope.user.name = data.name;
            $scope.user.email = data.email;
            $scope.user.id = data.id;
            $rootScope.user = $scope.user;
            $scope.$apply();
            
        }, function (error) {
          console.log(error);
        });

      }, function (error) {
        console.log(error);
      });

    /* 
    FB.login(function(){
      FB.api('/me?fields=id,name,picture{url},email', 'get', function(data){
        console.log($scope.user);

        $scope.user.picture = data.picture.data.url;
        $scope.user.name = data.name;
        $scope.user.email = data.email;
        $scope.user.id = data.id;
        $rootScope.user = $scope.user;
        $scope.$apply();
      });
    }, {scope: 'public_profile, user_friends, email'});
*/
  };


  

    
})

.controller('UsuarioslistsCtrl', function($rootScope, $scope, $http) {

  $scope.usuarios = [];
  $scope.user = $rootScope.user;

  $scope.$on('$ionicView.enter', function() {
    console.log('ENTER');
  });

  $scope.$on('$ionicView.beforeEnter', function() {
    console.log('beforeEnter');
    $http.get('http://api-prog4.herokuapp.com/usuario').then(function(resp) {
      $scope.usuarios = resp.data.data;
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });

  });

    
})

.controller('UsuarioCtrl', function($scope, $stateParams, $http, $location) {

  $scope.usuario = {};

  $http.get('http://api-prog4.herokuapp.com/usuario/'+ $stateParams.UsuarioId).then(function(resp) {
    $scope.usuario = resp.data.data;
  }, function(err) {
    console.error('ERR', err);
    // err.status will contain the status code
  }); 

  $scope.doSave = function() {
    $http.put('http://api-prog4.herokuapp.com/usuario/'+ $stateParams.UsuarioId, $scope.usuario).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/usuarios');
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  };

  $scope.doDelete = function() {
    $http.delete('http://api-prog4.herokuapp.com/usuario/'+ $stateParams.UsuarioId, $scope.usuario).then(function(resp) {
      console.log(resp.data);
      $location.path('/app/usuarios');
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  };
  
});
