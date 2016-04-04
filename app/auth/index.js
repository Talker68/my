"use strict";

import authComponent from './components/auth';

import base64Service from './services/base64';

export default angular.module('auth', [])
  .service('Base64Service', base64Service)

  .component('auth', authComponent)

  .service('authRejector', function($rootRouter) {
    this.responseError = (rejection) => {

      if (rejection.status === 401) {
        //$injector.get('$state').go('login');
        $rootRouter.navigate(['Auth']);
      }

      return rejection;
    };
  })

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authRejector');
  })


  .name;