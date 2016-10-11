"use strict";

export default function($http, $rootScope){
  
  this.auth = function () {
    return $http.get(`${REQUEST_PREFIX}/auth`)
  }

  this.setCurrentUser = function (user) {
    $rootScope.currentUser = user;
  }

  this.getCurrentUser = function () {
    return $rootScope.currentUser;
  }

  this.getCurrentUserType = function () {
    return $rootScope.currentUser.type[0];
  }
}
