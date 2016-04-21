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



  this.logistSetsForwarder = function (orderGuid, requestData) {
    requestData.operation = 'settingForwarder';
    return $http.post(`/logistics/order/${orderGuid}`, requestData)
  }

  //отказ тк от заказа напрямую
  this.forwarderRefuseOrder = function (orderGuid) {
    return $http.post(`/logistics/order/${orderGuid}`, {operation : 'refuseForwader'})
  }


  //тк подтвердила заказ присланный напрямую
  this.forwaderConfirmOrder = function({orderGuid, driverGuid, vehicleGuid, semitrailerGuid}) {
    return $http.post(`/logistics/order/${orderGuid}`,
      {
        operation : "confirmOrder",
        driverGuid : driverGuid,
        vehicleGuid : vehicleGuid,
        semitrailerGuid : semitrailerGuid
    })
  }


  //создания аукциона с заявкой
  this.createAuction = function (auction) {
    return $http.post(`/logistics/auction`, auction);
  }



}