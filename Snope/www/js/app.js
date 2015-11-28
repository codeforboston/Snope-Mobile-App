// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.defaults.useXDomain = true;

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  
  //login page  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  //login page  
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

  .state('list', {
    url: '/list',
    templateUrl: 'templates/list.html',
    controller: 'ListCtrl'
  })

  .state('jobDetail', {
    url: 'jobDetail/:id',
    templateUrl: 'templates/jobDetail.html',
    controller: 'JobDetailCtrl'
  })

  




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

//   

});

app.factory('JobService',['$http',function($http){
    var jobs = []; //Private Variable
    return {
        GetJobs: function(){ 
            // return $http.get("path/to/resource").then(function(response){
            //     people = response;
            //     return response;
            return [{id: 1,firstName: "Joe", lastName: "Doe", phoneNumber: "123"}, {id: 2, firstName: "Jane", lastName: "Doe", phoneNumber: "789"}];            
        },
        GetJob: function(jobId){
            for(i=0;i<jobs.length;i++){
                if(jobs[i].id == jobId){
                    return jobs[i];
                }
            }
        }
    }
}]);
