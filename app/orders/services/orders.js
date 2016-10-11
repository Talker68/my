"use strict";

export default function($http){
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

  //Получть символьный код статуса
  this.getOrderStatus = function(status){

    if(Array.isArray(status)){
      let result = [];
      for(let stat of status){
        result.push(getStatus(stat))
      }
      return result;
    } else {
      return getStatus(status);
    }

    function getStatus(status){
      status = parseInt(status);
      let textStatus;
      switch (status){
        case 0 : textStatus = ''; break;
        case 1 : textStatus = ''; break;
        case 2 : textStatus = 'FORMED'; break;
        case 3 : textStatus = 'INWORK'; break;
        default : textStatus = '';
      }
      return textStatus;
    }

  }


  //Получить символьный код редукциона
  this.getAuctionStatus = function(status){

    if(Array.isArray(status)){
      let result = [];
      for(let stat of status){
        result.push(getStatus(stat))
      }
      return result;
    } else {
      return getStatus(status);
    }

    function getStatus(status){
      status = parseInt(status);
      let textStatus;
      switch (status){
        case 0 : textStatus = 'ACTIVE'; break;
        case 1 : textStatus = 'ON_CONFIRM'; break;
        case 2 : textStatus = 'PENDING'; break;
        case 3 : textStatus = 'PLANNED'; break;
        default : textStatus = '';
      }

      return textStatus;
    }

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
  this.forwaderConfirmOrder = function({orderGuid, driver, vehicle, semitrailer}) {
    
    return $http.post(`${REQUEST_PREFIX}/order/${orderGuid}`,
      {
        operation : "confirmOrder",
        driverGuid : driver.guid,
        vehicleGuid : vehicle.guid,
        semitrailerGuid : semitrailer ? semitrailer.guid : ''
    })
  }

  //передача заявки оператору
  this.transferOrderToOperator = function (orderGuid) {
    return $http.post(`${REQUEST_PREFIX}/order/${orderGuid}`, {operation : "setAuction"});
  }

  //отмена передачи заявки оператору
  this.cancelTransferOrderToOperator = function (orderGuid) {
    return $http.post(`${REQUEST_PREFIX}/order/${orderGuid}`, {operation : "cancelAuction"});
  }

  /**
   * Создание редукциона
   *
   * @param orders
   * Массив заявок
   * @returns {*}
     */
  this.createAuctionByOrdersPack = function (orders) {
    return $http.post(`${REQUEST_PREFIX}/auction`, orders);
  }

  //отмена заплпнированного редукциона
  this.cancelPlannedAuction = function (auctionGuid) {
    return $http.put(`${REQUEST_PREFIX}/auction/${auctionGuid}`, {operation : "cancelAuction"});
  }

  //Сделать ставку
  this.newBet = function (auctionGuid, bid) {
    return $http.post(`${REQUEST_PREFIX}/auction/${auctionGuid}/bid`, {bid : bid});
  }

  //Получить испорию ставок
  this.showBidHistory = function(auctionGuid){
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
  this.showQueue = function (auctionGuid) {
    return $http.get(`${REQUEST_PREFIX}/auction/${auctionGuid}/queue`);
  }
}