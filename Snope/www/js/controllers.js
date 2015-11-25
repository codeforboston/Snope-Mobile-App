angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('LoginCtrl', function($scope, $stateParams, $http) {
  $scope.user = {};
  $scope.message = "";
  $scope.authenticate = function(){
    console.log($scope.user)
    $scope.message = "password invalid";  
  };
  

})

.controller('SignupCtrl', function($scope, $stateParams, $http) {
  $scope.user = {};
  $scope.type = "Shoveler";

  $scope.signup = function(){
    alert("hello!");
    $http.post('http://tunnel.shaneod.net/api/users?name=billy&type=shoveler&password=password')
    .then(function(response){
      console.log(response);
    });

    
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
