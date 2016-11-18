"use strict";

export default function($stateProvider) {

  $stateProvider
    .state('app', {
      url: "/",
      resolve: {
        user : AuthService => AuthService.auth().then(response => AuthService.user = response.data)
      },
      component: 'app'
    });
}