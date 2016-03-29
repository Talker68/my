"use strict";

export default function($http){
  this.getFormedOrders = function () {
    return $http.get('/formed_orders');
  }

  this.getInWorkOrders = function () {
    return $http.get('/inwork_orders');
  }

  this.getOrder = function (guid) {
    return $http.get(`/orders/${guid}`);
  }
}