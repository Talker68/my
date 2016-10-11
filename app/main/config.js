"use strict";

export default function($stateProvider, $locationProvider, $urlRouterProvider) {
  // $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('app', {
      url: "/",
      resolve: {
        user: function(AuthService) {
          if (!AuthService.getCurrentUser()) {
            return AuthService.auth().then(response => {
              AuthService.setCurrentUser(response.data);
            });
          }
        },
        loadingTypes: function(VehicleService) {
          return VehicleService.getLoadingTypes().then(response => {
            VehicleService.setLoadingTypes(response.data);
          });
        }
      },
      controller: function() {},
      template: "<app></app>"
    });
}
