"use strict";

import indexState from './index';
import formedState from './formed';
import inworkState from './inwork';

import orderState from './order';
import orderDetailState from './orderDetail';

export default function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('index', indexState)
    .state('formed', formedState)
    .state('inwork', inworkState)
    .state('order', orderState)
    .state('orderDetail', orderDetailState)

  $urlRouterProvider.otherwise('/formed');
  $urlRouterProvider.when('/', '/formed');
}