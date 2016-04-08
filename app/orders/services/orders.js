"use strict";

export default function($http, $q){
  this.getOrdersByStatus = function (status) {
    return $http.get(`/logistics/order?status=${status}`);
  }

  this.getOrderByGuid = function (guid) {
    return $http.get(`/logistics/order/${guid}`);
  }

  this.patchOrder = function (orderGuid, requestData) {
    return $http.patch(`/logistics/order/${orderGuid}`, requestData)
  }



}