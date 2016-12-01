"use strict";

export default function($http){

  this.ORDER_STATUSES = {
    FORMED: 2,
    INWORK: 3
  };

  this.AUCTION_STATUSES = {
    ACTIVE : 0,
    ON_CONFIRM : 1,
    PENDING : 2,
    PLANNED : 3
  };

  this.LIST_ORDER_TYPES = {
    SHIPMENT_DATE : 0,
    AUCTION_START : 1
  }


  //Получить список заявок по статусу
  this.getOrdersByStatus = function (status) {
    return $http.get(`${REQUEST_PREFIX}/order?status=${status}`);
  }

  //Получить заявку по ее guid
  this.getOrderByGuid = function (guid) {
    return $http.get(`${REQUEST_PREFIX}/order/${guid}`);
  }

  //Получить редукционные заявки по статусу
  this.getAuctionOrders = function(status){
    return $http.get(`${REQUEST_PREFIX}/auction?status=${status}`)
  }



  //Создание прямого заказа
  this.directOrder = function (orderGuid, requestData) {
    requestData.operation = 'settingForwarder';
    return $http.post(`${REQUEST_PREFIX}/order/${orderGuid}`, requestData)
  }

  //отказ тк от заказа напрямую
  this.forwarderRefuseOrder = function (orderGuid) {
    return $http.post(`${REQUEST_PREFIX}/order/${orderGuid}`, {operation : 'refuseForwader'})
  }

  //тк подтвердила заказ присланный напрямую
  this.forwaderConfirmOrder = function(orderGuid, requestData){
    requestData.operation = "confirmOrder";
    return $http.post(`${REQUEST_PREFIX}/order/${orderGuid}`, requestData)
  }



  //передача заявки оператору
  this.transferOrderToOperator = function (orderGuid) {
    return $http.post(`${REQUEST_PREFIX}/order/${orderGuid}`, {operation : "setAuction"});
  }

  //отмена передачи заявки оператору
  this.cancelTransferOrderToOperator = function (orderGuid) {
    return $http.post(`${REQUEST_PREFIX}/order/${orderGuid}`, {operation : "cancelAuction"});
  }



  // Создание редукциона
  this.createAuctionByOrdersPack = function (orders) {
    return $http.post(`${REQUEST_PREFIX}/auction`, orders);
  }

  // Отмена заплпнированного редукциона
  this.cancelPlannedAuction = function (auctionGuid) {
    return $http.put(`${REQUEST_PREFIX}/auction/${auctionGuid}`, {operation : "cancelAuction"});
  }



  // Сделать ставку
  this.newBet = function (auctionGuid, bid) {
    return $http.post(`${REQUEST_PREFIX}/auction/${auctionGuid}/bid`, {bid : bid});
  }

  // Получить историю ставок
  this.getBidHistory = function(auctionGuid){
    return $http.get(`${REQUEST_PREFIX}/auction/${auctionGuid}/bid`);
  }



  //Встать в очередь
  this.addToQueue = function(auctionGuid){
    return $http.post(`${REQUEST_PREFIX}/auction/${auctionGuid}/queue`);
  }

  //Выйти из очереди
  this.leaveQueue = function(auctionGuid){
    return $http.delete(`${REQUEST_PREFIX}/auction/${auctionGuid}/queue`);
  }

  //Получить очередь
  this.getQueue = function (auctionGuid) {
    return $http.get(`${REQUEST_PREFIX}/auction/${auctionGuid}/queue`);
  }

  // Получить элемент из списка по его guid
  this.getOrderByGuid = function(guid, orderList) {
    guid = guid.toLowerCase();

    for (let index = 0; index < orderList.length; index++) {
      if (orderList[index].order.guid.toLowerCase() === guid) {
        return {
          index,
          element : orderList[index]
        }
      }
    }
    return undefined;
  };
}