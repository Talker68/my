"use strict";

export default function($http){
  this.getFormedOrders = function () {
    return $http.get('/formed_orders');
  }
}