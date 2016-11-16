"use strict";

export default function($stateProvider) {
  let resolve = {};
  let user;

  // Получение пользователя
  resolve.user = function(AuthService) {
    return AuthService.auth().then(response => {
      AuthService.user = response.data;
      //return response.data;
    });
  }

  // Типы отгрузки
  resolve.loadingTypes = function(VehicleService) {
    return VehicleService.getLoadingTypes().then(response => {
      VehicleService.loadingTypes = response.data;
      return response.data;
    });
  };



  // список ТК
  resolve.forwarders = function(ForwardersService, ) {
    return ForwardersService.getForwarders().then(response => {
      ForwardersService.forwarders = response.data;
      return response.data;
    });
  }


  $stateProvider
    .state('app', {
      url: "/",
      resolve: resolve,
      component: 'app'
    });
}