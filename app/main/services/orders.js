"use strict";

export default function($http){
  this.getOrdersByStatus = function (status) {
    return $http.get(`/logistics/order?status=${status}`);
  }

  this.getOrderByGuid = function (guid) {
    return $http.get(`/logistics/order/${guid}`);
  }

  this.setForwarder = function (orderGuid, frowarderGuid, orderAcceptTime) {
    console.log(arguments);
    // /return $http.patch(`/logistics/order/${guid}`, {forwarderGuid : frowarderGuid, orderAcceptTime : orderAcceptTime})
  }
}