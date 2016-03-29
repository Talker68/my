"use strict";

export default function($http){
  this.getFormedOrders = function () {
    return $http.get('/orders?status=1');
  }

  this.getInWorkOrders = function () {
    return $http.get('/orders?status=2');
  }

  this.getOrder = function (guid) {
    return $http.get(`/orders/${guid}`);
  }
}