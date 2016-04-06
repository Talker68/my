"use strict";

export default function($http, $q){
  this.getOrdersByStatus = function (status) {
    return $http.get(`/logistics/order?status=${status}`);
  }

  this.getOrderByGuid = function (guid) {
    return $http.get(`/logistics/order/${guid}`);
  }

  this.setForwarder = function (orderGuid, frowarderGuid, orderAcceptTime) {
    return $http.patch(`/logistics/order/${orderGuid}`, {forwarderGuid : frowarderGuid, orderAcceptTime : orderAcceptTime})
  }

  this.clearForwarder = function (orderGuid) {
    return $http.patch(`/logistics/order/${orderGuid}`, {forwarderGuid : '', orderAcceptTime : ''})
  }
}