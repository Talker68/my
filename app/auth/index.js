"use strict";


import userComponent from './components/user';
import AuthService from './services/auth';


export default angular.module('auth', [])

  .service('AuthService', AuthService)

  .component('user', userComponent)

  .name;