"use strict";

export default function($http, $rootScope, $cookies){
  this.SetCredentials = function (user, authData){
    //установка заголовка
    $http.defaults.headers.common.Authorization = `Basic ${authData}`;
    //установка текущего пользователя
    $rootScope.globals = {
      currentUser: {
        user: user,
        authData: authData
      }
    };
    //сохранение в куку
    $cookies.putObject('globals', $rootScope.globals);

  };

  
  this.logout = function () {
    $rootScope.globals = {};
    $cookies.remove('globals');
    $http.defaults.headers.common.Authorization = 'Basic ';
  }
}
