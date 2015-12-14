angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

<<<<<<< HEAD
.controller('LoginCtrl', function($scope, $stateParams, $http, $state, $rootScope, userService) {
  $scope.user = {};
  $scope.message = "";
  $scope.authenticate = function(){
    $http.post('http://45.55.102.116/api/login', $scope.user).then(function(response){
=======
.controller('LoginCtrl', function($scope, $stateParams, $http, $state, $rootScope, apiAddress) {
  $scope.user = {};
  $scope.message = "";
  $scope.authenticate = function(){
    $http.post(apiAddress+'api/login', $scope.user).then(function(response){
>>>>>>> eee40912486fe41a4208571c487843a0a6d208b3
      
      if (response.data.statusCode === 200){
        var userObject = {};
        userObject['userId'] = response.data.userId;
        userObject['userType'] = response.data.userType;      

        userService.setUser(userObject);
        var serviceUser = userService.getUser();
        debugger;        

        $state.go('tab.list');  
      } else {
        alert("Error: " + response.data.message);
      }
      
      
    });
    console.log($scope.user)
    //$scope.message = "password invalid";
  };

})

.controller('SignupCtrl', function($scope, $stateParams,$state, $http, $rootScope, apiAddress) {
  $scope.user = {};
  // $scope.type = "Shoveler";

  $scope.signup = function(){


    $http.post(apiAddress+'api/users', $scope.user)

    .then(function(response){
      
      if(response.data.statusCode == 200) {        
        
        $rootScope.userId = response.data.userId;
        $rootScope.userType = response.data.userType;
        debugger;
        $state.go('tab.list');

      } else if(response.data.statusCode == 500){
        alert(response.data.message);
      }
    });

  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ListCtrl', ['$state','$scope', 'JobService',function($state, $scope, JobService){
    //get open jobs available to shoveler
    JobService.GetOpenJobsForShoveler().then(function(result){
    $scope.jobs = result;  
    
  });
  

}])

.controller('JobDetailCtrl', [ '$scope','$stateParams', '$log', '$timeout', 'JobService', 'uiGmapGoogleMapApi',function(  $scope, $stateParams, $log, $timeout, JobService, uiGmapGoogleMapApi){
  var jobId = $stateParams.id;
  $scope.job = JobService.GetOpenJob(jobId);
  
  var latitude = parseFloat($scope.job.latitude);
  var longitude = parseFloat($scope.job.longitude);

 // 
    $scope.map = {center: {latitude: latitude, longitude: longitude }, zoom: 16 };    
    $scope.marker = {
      id: 0,
      coords: {
        latitude: latitude,
        longitude: longitude
      }
    };
}])


.controller('PastJobsCtrl', ['$scope', 'JobService','userService',function($scope, JobService, userService){
  var user = userService.getUser();
  var userId = user.userId;
  JobService.GetCompletedJobsForShoveler(userId).then(function(result){
    $scope.jobs = result;
    debugger;
  });
  


}])

.controller('TabCtrl', function($state, $scope){
  var hideTabsStates = ['login']; 

    $rootScope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = ~hideTabsStates.indexOf($state.current.name)
    });

  
})

.controller('PostJobCtrl', ['$scope', 'Camera','$http', 'uiGmapGoogleMapApi', '$cordovaGeolocation', 'apiAddress', function($scope, Camera, $http, uiGmapGoogleMapApi, $cordovaGeolocation, apiAddress){

  $scope.job = {};  
  $scope.job['customerId'] = "56551c3995df308b01000004";
  alert("call get user location");
  debugger;
  $scope.getUserLocation = function(){
    debugger;
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var lng = position.coords.longitude
        alert("location found");
        debugger;
        $scope.getUserAddressFromLocation(lat, lng);
      }, function(err) {
        debugger;
        // error
      });
  }

  $scope.getUserAddressFromLocation = function(lat, lng){

    uiGmapGoogleMapApi.then(function(maps) {
      var latlng = {lat: lat, lng: lng};
      var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          
          if (results[1]) {
                                  
            
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    });
  }
  

  $scope.geocodeAddress = function(){
    uiGmapGoogleMapApi.then(function(maps) {      
      //create Google geocoder
      var geocoder = new google.maps.Geocoder();
      //gather address information from post job form
      var addressString = $scope.job.address + ", " + $scope.job.city + ", " + $scope.job.state + ", " + $scope.job.zipCode;
      //find lat and lng associate with user-entered address
      geocoder.geocode( {address: addressString }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        
        $scope.job['latitude'] = results[0].geometry.location.G;
        $scope.job['longitude'] = results[0].geometry.location.K;

        //submit job only after successful geocoding
        
        $scope.postJob();
                    
        } else {      
          alert("We couldn't find your address. Please try again. Error: " + status);
        }
      });
    });
  };
  
  
  $scope.getPhoto = function() {

    var cameraOptions =   {   quality: 50,
                      destinationType: navigator.camera.DestinationType.DATA_URL,
                      sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                      encodingType: 0     // 0=JPG 1=PNG
                  };

    navigator.camera.getPicture(function(imageData) {
      

      $scope.job['photo'] = imageData;
    

  }, function(err) {

    alert("Error: " + err);

  }, cameraOptions);

  };

  $scope.postJob = function(){


    $http.post(apiAddress+'api/jobs', $scope.job)
    .then(function(response){
      
        alert("post success!");        
      if(response.data.statusCode == 200) {      
      
      } else if(response.data.statusCode == 500){

      }                    
    });
  }


}]);
