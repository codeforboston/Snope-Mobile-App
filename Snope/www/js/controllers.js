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

.controller('LoginCtrl', function($scope, $stateParams, $http, $state) {
  $scope.user = {};
  $scope.message = "";
  $scope.authenticate = function(){
    $http.post('http://45.55.102.116/api/login', $scope.user).then(function(response){
      
      if (response.data.statusCode === 200){
        $state.go('tab.list');  
      } else {
        alert("Error: " + response.data.message);
      }
      
      
    });
    console.log($scope.user)
    //$scope.message = "password invalid";
  };

})

.controller('SignupCtrl', function($scope, $stateParams,$state, $http) {
  $scope.user = {};
  // $scope.type = "Shoveler";

  $scope.signup = function(){


    $http.post('http://45.55.102.116/api/users', $scope.user)
    .then(function(response){
      
      if(response.data.statusCode == 200) {
        //alert(response.message);
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
    JobService.GetJobs().then(function(result){
    $scope.jobs = result;  
    
  });
  

}])

.controller('JobDetailCtrl', [ '$scope','$stateParams', '$log', '$timeout', 'JobService', 'uiGmapGoogleMapApi',function(  $scope, $stateParams, $log, $timeout, JobService, uiGmapGoogleMapApi){
var jobId = $stateParams.id;
  $scope.job = JobService.GetJob(jobId);
  
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


.controller('PastJobsShovelerCtrl', ['$scope', 'JobService',function($scope, JobService){
  $scope.jobs = JobService.GetJobs();

}])

.controller('TabCtrl', function($state, $scope){
  var hideTabsStates = ['login']; 

    $rootScope.$on('$ionicView.beforeEnter', function () {
        $rootScope.hideTabs = ~hideTabsStates.indexOf($state.current.name)
    });

  
})

.controller('PostJobCtrl', ['$scope', 'Camera','$http', 'uiGmapGoogleMapApi',function($scope, Camera, $http, uiGmapGoogleMapApi){

  $scope.job = {};  
  $scope.job['customerId'] = "56551c3995df308b01000004";


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
        debugger;
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

    $http.post('http://45.55.102.116/api/jobs', $scope.job)
    .then(function(response){
      
        alert("post success!");        
      if(response.data.statusCode == 200) {      
      
      } else if(response.data.statusCode == 500){

      }                    
    });
  }

}]);
