// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'uiGmapgoogle-maps'])

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
    url: '/jobDetail/:id',
    templateUrl: 'templates/jobDetail.html',
    controller: 'JobDetailCtrl'
  })

  .state('postJobForm', {
    url: '/postJobForm',
    templateUrl: 'templates/postJobForm.html',
    controller: 'PostJobCtrl'
  })

    .state('pastJobsShoveler', {
      url: '/jobsShoveler',
      templateUrl: 'templates/pastJobsShoveler.html',
      controller: 'PastJobsShovelerCtrl'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');


})
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDu3ACzX5UEHrISWJyIDEYjN40IppUvbbM',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});

app.factory('JobService',['$http',function($http){
    var jobs = []; //Private Variable
    return {
        GetJobs: function(){
            // return $http.get("path/to/resource").then(function(response){
            //     people = response;
            //     return response;
            jobs = $http.get('http://45.55.102.116/api/jobs')

            .then(function(result){
              jobs = result;
               
            });

            return jobs;
            

            
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
