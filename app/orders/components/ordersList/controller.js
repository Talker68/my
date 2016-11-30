"use strict";

export default function($stateParams, $q, OrdersService, VehicleService, ApiService, AuthService) {

  this.$onInit = function() {
    // Заголовок списка
    this.listTitle = $stateParams.title ? $stateParams.title : 'Заявки';

    // Тип пользователя
    this._userType = AuthService.getUserType();

    // Получение заявок и запуск автообновления
    this.updateList();
  }


  this.$onDestroy = function(){
    // Отключкение таймера
    clearTimeout(this._updateTimer);
  }


  this.updateList = function() {
    this._getOrders().then(response => {

      let responseOrdersList = [];
      for (let orders in response) {
        responseOrdersList = responseOrdersList.concat(response[orders].data);
      }


      if (this.orders && this.orders.length) {
        // Сначала проверка на то что все задачи в списке еще актуальны
        for (let i = 0; i < this.orders.length; i++) {
          if (!ApiService.getArrayElementByGuid(this.orders[i].guid, responseOrdersList)) {
            console.log('DELETE');
            this.orders.splice(i, 1);
          }
        }

        // Проверка на необходимость обновления существующих и добаление новых
        for (let order of responseOrdersList) {
          let orderIndex = this.orders.findIndex(item => item.guid === order.guid);
          if (orderIndex === -1) {
            console.log("NEW")
            this.orders.push(order);
          } else if (this.orders[orderIndex].modified !== order.modified) {
            console.log("UPDATE");
            // Если заявка, была спрятана, то при обновлении данных она останется скрытой
            order.hidden = this.orders[orderIndex].hidden;
            this.orders.splice(orderIndex, 1, order);
          }
        }

      } else {
        this.orders = responseOrdersList;
      }


      //this._setFiltersData();
      console.log('UPDATE_TIMER');
      this._updateTimer = setTimeout( () => {this.updateList()}, UPDATE_TIME)

    });
  }

  // получить список заявок
  this._getOrders = function() {

    let requests = {};

    if ($stateParams.auction) {
      let auctionStatuses = Array.isArray($stateParams.auction) ? $stateParams.auction : [$stateParams.auction];
      for (let status of auctionStatuses) {
        requests['auctionOrders' + status] = OrdersService.getAuctionOrders(status);
      }
    }

    if ($stateParams.status) {
      let orderStatuses = Array.isArray($stateParams.status) ? $stateParams.status : [$stateParams.status];
      for (let status of orderStatuses) {
        requests['directOrders' + status] = OrdersService.getOrdersByStatus(status);
      }
    }

    return $q.all(requests);
  }



   // Собирет данные для фильтров
  this._setFiltersData = function () {
    // Формирование "умного" фильтра
    this.loadingTypes = [];
    this.forwarders = [];
    this.vehicle = [];
    this.semitrailers = [];
    this.drivers = [];

    for(let order of this.list){
      if(ApiService.getIndexById(this.loadingTypes, {fieldName : 'guid', value : order.forwarder.vehicle.vehicle_type.guid}) === -1){
        this.loadingTypes.push(order.forwarder.vehicle.vehicle_type)
      }

      if(order.forwarder.guid && ApiService.getIndexById(this.forwarders, {fieldName : 'guid', value : order.forwarder.guid}) === -1){
        this.forwarders.push({guid : order.forwarder.guid, title : order.forwarder.title})
      }

      if(order.forwarder.vehicle.guid && ApiService.getIndexById(this.vehicle, {fieldName : 'guid', value : order.forwarder.vehicle.guid}) === -1){
        this.vehicle.push({guid : order.forwarder.vehicle.guid, plate_number : order.forwarder.vehicle.plate_number})
      }

      if(order.forwarder.semitrailer.guid && ApiService.getIndexById(this.semitrailers, {fieldName : 'guid', value : order.forwarder.semitrailer.guid}) === -1){
        this.semitrailers.push({guid : order.forwarder.semitrailer.guid, plate_number : order.forwarder.semitrailer.plate_number, title : order.forwarder.semitrailer.title})
      }

      if(order.forwarder.driver.guid && ApiService.getIndexById(this.drivers, {fieldName : 'guid', value : order.forwarder.driver.guid}) === -1){
        this.drivers.push({guid : order.forwarder.driver.guid, full_name : order.forwarder.driver.full_name})
      }
    }
  }

  // Устанавливает список фильтров для текущего интрефейса
  this._setFiltersList = function () {
    this.filtersList = ['id', 'routeStartDate', 'warehouseAddress', 'unloadingAddress', 'loadingType'];

    if(this._userType === 'logist'){

      if(this._ordersStatus === 'FORMED'){
        this.filtersList = this.filtersList.concat('forwarder');
      } else if (this._ordersStatus === 'INWORK'){
        this.filtersList = this.filtersList.concat('vehiclePlateNumber', 'semitrailerPlateNumber', 'driverFullName');
      }

    } else if (this._userType === 'forwarder') {

      if(this._ordersStatus === 'INWORK'){
        this.filtersList = this.filtersList.concat('vehicle', 'semitrailer', 'driver');
      }
    }

    this.filters = {};
  }



  // Удаление из списка
  this.removeOrder = function (orderGuid) {
    let orderIndex = ApiService.getArrayElementByGuid(orderGuid, this.orders).index;
    this.orders.splice(orderIndex, 1);
  }

  // Обновить order в списке
  this.updateOrder = function(order) {
    let orderIndex = ApiService.getArrayElementByGuid(order.guid, this.orders).index;
    this.orders.splice(orderIndex, 1, order);
  }


  this.orderFunc = function(order) {
    let orderBy;
    if (!$stateParams.orderBy) {
      orderBy = OrdersService.LIST_ORDER_TYPES.SHIPMENT_DATE;
    } else {
      orderBy = parseInt($stateParams.orderBy);
    }

    if (orderBy === OrdersService.LIST_ORDER_TYPES.SHIPMENT_DATE) {
      return new Date(order.route.routePoints[order.route.routePoints.length-1].date);
    }

    if (orderBy === OrdersService.LIST_ORDER_TYPES.AUCTION_START) {
      return new Date(order.auction.start)
    }

  }

}