angular.module('starter.services', [])


.factory('userService', function() {
  var user = {};
  var setUser = function(userArgument) {
      user = userArgument;
  };

  var getUser = function(){
    debugger;
      return user;
  };

  return {
    setUser: setUser,
    getUser: getUser
  };

})

.factory('JobService',['$http', '$filter', 'apiAddress',function($http, $filter, apiAddress){
    var openJobs = [];
    var inProgressJobs = [];
    var completedJobs = [];
    return {

        //get all open jobs available to shovelers

        GetOpenJobsForShoveler: function(location){

          return $http.get(apiAddress+'api/openJobsForShoveler')
            .then(function(result){
              openJobs = result.data;
              return openJobs;
            });
        },
        //GET for a specific job
        GetJob: function(jobId){
          // var object_by_id = $filter('filter')(jobs, {_id: jobId })[0];
          // return object_by_id;
          return $http.get(apiAddress+'api/jobs/' + jobId)
            .then(function(result){
              return result.data;
            });
        },


        //get all jobs tied to one shoveler
        GetCompletedJobsForShoveler: function(userId){
            return $http.get(apiAddress+'api/completedJobsForShoveler/' + userId)
            .then(function(result){
              completedJobs = result.data;
              return completedJobs;
            });
        },


        //get in-progress jobs for a shoveler
        GetInProgressJobsForShoveler: function(userId){


            return $http.get(apiAddress+'api/inProgressJobsForShoveler/' + userId)
            .then(function(result){
              inProgressJobs = result.data;
              return inProgressJobs;
            });
        },


        //get all jobs tied to one customer
        GetJobsForCustomer: function(){

            return $http.get(apiAddress+'api/jobs')
            .then(function(result){
              jobs = result.data;
              return jobs;
            });
        },

        //get a specific job tied to one customer
        GetJobsForCustomer: function(jobId){

            var object_by_id = $filter('filter')(jobs, {_id: jobId })[0];
            return object_by_id;
        }

    }
}])

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
