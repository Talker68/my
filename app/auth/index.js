"use strict";

import cookies from 'angular-cookies';

import authComponent from './components/auth';
import userComponent from './components/user';

import base64Service from './services/base64';
import AuthRejector from './services/authRejector';
import AuthService from './services/auth';


export default angular.module('auth', [cookies])
  // .service('Base64Service', base64Service)
  // .service('authRejector', AuthRejector)
  // .service('AuthService', AuthService)

  //.component('auth', authComponent)
  .component('user', userComponent)
  
  // .config(function($httpProvider) {
  //   $httpProvider.interceptors.push('authRejector');
  // })
  //
  // .run(
  //   function ($rootScope, $cookies, $http) {
  //     $rootScope.globals = $cookies.getObject('globals') || {};
  //     if ($rootScope.globals.currentUser) {
  //       //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authData;
  //     }
  //   })

  .name;