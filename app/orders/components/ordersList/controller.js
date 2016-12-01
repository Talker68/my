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

  // Получение заявок и запуск автообновления
  this.updateList = function() {
    this._getOrders().then(response => {
      let responseOrdersList =
        response
          .reduce((prev, current) => [...prev, ...current.data], [])
          .map(order => ({isHidden : false, order: order}));

      if (this.ordersList && this.ordersList.length) {
        // Проверка на актуальность текущих заявок
        this.ordersList = this.ordersList
          .filter(orderInList => OrdersService.getOrderByGuid(orderInList.order.guid, responseOrdersList))
          .map(orderInList => {
            let sameOrderInResponse = OrdersService.getOrderByGuid(orderInList.order.guid, responseOrdersList).element;
            if (orderInList.order.modified === sameOrderInResponse.order.modified){
              return orderInList;
            } else {
              sameOrderInResponse.isHidden = orderInList.isHidden;
              return sameOrderInResponse
            }
          })

        //Добавление новых
        this.ordersList = this.ordersList.concat(responseOrdersList.filter(orderInResponse => !OrdersService.getOrderByGuid(orderInResponse.order.guid, this.ordersList)));

      } else {
        this.ordersList = responseOrdersList;
      }


      //this._setFiltersData();
     this._updateTimer = setTimeout( () => {this.updateList()}, UPDATE_TIME)

    });
  }

  // получить список заявок
  this._getOrders = function() {

    let requests = [];

    if ($stateParams.auction) {
      let auctionStatuses = Array.isArray($stateParams.auction) ? $stateParams.auction : [$stateParams.auction];
      for (let status of auctionStatuses) {
        requests.push(OrdersService.getAuctionOrders(status));
      }
    }

    if ($stateParams.status) {
      let orderStatuses = Array.isArray($stateParams.status) ? $stateParams.status : [$stateParams.status];
      for (let status of orderStatuses) {
        requests.push(OrdersService.getOrdersByStatus(status));
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
    let orderIndex = OrdersService.getOrderByGuid(orderGuid, this.ordersList).index;
    this.ordersList.splice(orderIndex, 1);
  }

  // Обновить order в списке
  this.updateOrder = function(order) {
    let orderInList = OrdersService.getOrderByGuid(order.guid, this.ordersList);
    let orderToReplace = {};
    orderToReplace.order = order;
    orderToReplace.isHidden = orderInList.element.isHidden;
    this.ordersList.splice(orderInList.index, 1, orderToReplace);
  }


  this.orderFunc = function(orderObj) {
    let order = orderObj.order;

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