"use strict";

export default function($http){
  this.getFormedOrders = function () {
    return $http.get('/order?status=1');
  }

  this.getInWorkOrders = function () {
    return $http.get('/order?status=2');
  }

  this.getOrder = function (guid) {
    return $http.get(`/order/${guid}`);
  }
}