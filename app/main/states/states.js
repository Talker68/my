"use strict";

import indexState from './index';
import formedState from './formed';
import inworkState from './inwork';

export default function($stateProvider, $urlRouterProvider, $locationProvider){
  $stateProvider
    .state('index', indexState)
    .state('formed', formedState)
    .state('inwork', inworkState);

  $urlRouterProvider.otherwise('/formed');
  $urlRouterProvider.when('/', '/formed');
}