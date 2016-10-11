"use strict";

export default function (ApiService, AuthService, OrdersService, VehicleService, ForwardersService, DriversService, $stateParams, $q) {

  this.$onInit = function () {

    //Тип пользователя
    this._userType = AuthService.getCurrentUserType();


    //Статус аукциона
    if ($stateParams.auction) {
      this._auctionStatus = OrdersService.getAuctionStatus($stateParams.auction);
    }

    //Статус заявки
    if ($stateParams.status) {
      this._ordersStatus = OrdersService.getOrderStatus($stateParams.status);
    }


    //порядок
    this.orderProperty =  $stateParams.order ? $stateParams.order : 'datetime';

    //установка заголовка
    this._setListTitle();


    this._getOrders().then((response) => {
      this.list = [];

      for(let orders in response){
        this.list = this.list.concat(response[orders].data);
      }

      this._setFiltersData();

    })

    //Получение списка фильтров
    this._setFiltersList();

    //автообновление
    this._refresh(UPDATE_TIME);
  }

  this.$onDestroy = function(){
    clearTimeout(this._refreshTimer);
  }


  this._refresh = function (refreshInterval) {
    let repeatFunc;
    this._refreshTimer = setTimeout(repeatFunc = () => {
      this._getOrders().then((response) => {
        //this.list = response.data;

        let responseOrders = [];


        for(let orders in response){
          responseOrders = responseOrders.concat(response[orders].data);
        }


        //проверка тех заявок которые уже есть на наличие их в ответе на запрос, если нет то удаляется
        this.list.forEach((item, index, arr) => {
          let findIndex = ApiService.getIndexById(responseOrders , {fieldName: 'guid', value: item.guid});

          if(findIndex === -1){
            console.log('REMOVE');
            this.list.splice(index, 1);
          }
        })

        //теперь проверка ответа и поиск среди именющихся заявок, далее обновление или добавление в список
        for(let order of responseOrders){
          let index = ApiService.getIndexById(this.list , {fieldName: 'guid', value: order.guid});
          if(index !== -1){

            let copyToCheck = angular.copy(this.list[index]);
            delete  copyToCheck.hidden;

            if(!this.list[index].hidden && !angular.equals(order, copyToCheck)){
              console.log('UPDATE')
              this.list.splice(index, 1, order);
            }
          } else {
            console.log('CREATE');
            this.list.push(order);
          }
        }

        this._setFiltersData();

        this._refreshTimer = setTimeout(repeatFunc, refreshInterval)

      })

    }, refreshInterval)
  }


  /**
   * Получить список заявок
   * @private
   */
  this._getOrders = function(){

    let requests = {};

    if ($stateParams.auction) {

      if(Array.isArray($stateParams.auction)){
        for(let status of $stateParams.auction){
          requests['auctionOrders' + status] = OrdersService.getAuctionOrders(status);
        }
      } else {
        requests.auctionOrders = OrdersService.getAuctionOrders($stateParams.auction);
      }

    }

    if($stateParams.status) {
      requests.directOrders = OrdersService.getOrdersByStatus($stateParams.status);
    }

    return $q.all(requests);

  }

  /**
   * Собирет данные для фильтров
   * @private
   */
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

  /**
   * Устанавливает заголовок списка
   * @private
   */
  this._setListTitle = function () {
    this.listTitle = $stateParams.title ? $stateParams.title : 'Заявки';
  }

  /**
   * Устанавливает список фильтров для текущего интрефейса
   * @private
   */
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

  /**
   * Метод для проверки наличия фильтра в текущем интерфейсе
   * @param filterName
   * @returns {boolean}
   */
  this.hasFilter = function (filterName) {
    return this.filtersList.indexOf(filterName) !== -1 ;
  }

  /**
   *  удаление из списка
   */
  this.removeOrderFromList = function (orderGuid) {
    let orderIndex = ApiService.getIndexById(this.list, {fieldName: 'guid', value: orderGuid});
    this.list.splice(orderIndex, 1);
  }


}