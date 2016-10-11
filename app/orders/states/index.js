"use strict";

import ordersList from './ordersList';
import orderDetail from './orderDetail';

export default function($stateProvider){
  $stateProvider
    .state('ordersList', ordersList)
    .state('orderDetail', orderDetail)
    .state('orderListNew' , {
      url: "orderListNew",
      parent: "app",
      template: "<orders-list-new></orders-list-new>"
    })
}