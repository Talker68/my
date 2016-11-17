"use strict";



export default function(OrdersService, AuthService, ForwardersService, VehicleService, DriversService, $compile, $scope, $element, $attrs, ModalService, $state, $stateParams) {

  this.$onInit = function () {

    //Текущая дата
    this.now = new Date();

    this._userType = AuthService.getCurrentUserType();
    this._viewMode = $attrs.viewMode;

    this.orderStatus = OrdersService.getOrderStatus(this.order.status);
    this.auctionStatus = this.order.auction ? OrdersService.getAuctionStatus(this.order.auction.status) : '';

    //Подготовка данных для действий с зявкой
    this._init();
    //Компиляция шаблонов в зависимсти от типа полльзователя, режима просмотра и статуса заявки
    this._compileTemplate()
    //Активная вкладка берется из параметорв стэйта
    this.activeTab = $stateParams.activeTab ? $stateParams.activeTab : 'main';

    //до планового времени загрузки осталось менее  24 часов
    this.deadline = parseInt((Date.parse(this.order.route.warehouse.datetitme) - new Date().valueOf())/3600000) < 24 ? true : false;

    this.onBoard = (this.order.auction && this.order.auction.startingBid === this.order.auction.takeNowAmount) ? true : false;

  }


  this.hide = function(){
    this.order.hidden = true;
  }

  //установка транспортной компании для заявки
  this.makeDirectOrder = function (forwarder) {

    let modalInstance = ModalService.showConfirm(`Отправить заявку напрямую ${forwarder.title} ?`);

    modalInstance.result.then(
      (response) => {
        OrdersService.directOrder(this.order.guid, {
          forwarderGuid: forwarder.guid,
          orderAcceptTime: this.orderAcceptTime
        }).then(
          (response) => {resolve()}
        )
      },
      (reject) => {}
    )
  };



  //Передача заявки опаератору
  this.transferOrderToOperator = function () {
    let modalInstance = ModalService.showConfirm(`Передать заявку оператору редукционов ?`);

    modalInstance.result.then(
      (response) => {
        OrdersService.transferOrderToOperator(this.order.guid).then(
          (response) => {resolve()}
        )
      },
      (reject) => {}
    )
  }




  //Отменить передачу заявки опреатору
  this.cancelTransferOrderToOperator = function () {
    let modalInstance = ModalService.showConfirm(`Отменить передачу заявки оператору редукционов ?`);

    modalInstance.result.then(
      (response) => {
        OrdersService.cancelTransferOrderToOperator(this.order.guid).then(
          (response) => {resolve()}
        )
      },
      (reject) => {}
    )
  }


  //Отмена запланированного редукциона (оператор отменят заплпнированный редукцион)
  this.cancelPlannedAuction = function () {

    let modalInstance = ModalService.showConfirm(`Отменить заплпнированный редукцион ?`);

    modalInstance.result.then(
      (response) => {
        OrdersService.cancelPlannedAuction(this.order.auction.guid).then(
          (response) => {$state.transitionTo('ordersList', {auction : 3}, {reload: true})}
        )
      },
      (reject) => {}
    )
  }

  //ТК подтверждает заявку
  this.forwarderConfirmOrder = function () {

    let modalInstance = ModalService.showConfirm(`Подтвердить заявку ?`);

    modalInstance.result.then(
      (response) => {

        let options = {
          orderGuid: this.order.guid,
          driver: this.driver,
          vehicle: this.vehicle,
          semitrailer: this.semitrailer
        };

        OrdersService.forwaderConfirmOrder(options).then(
          (response) => {resolve('transport')}
        );
      },
      (reject) => {}
    )
  }


  //ТК отказывается от заявки
  this.forwarderRefuseOrder = function () {

    let modalInstance = ModalService.showConfirm(`Отказаться от заявки ?`);

    modalInstance.result.then(
      (response) => {
        OrdersService.forwarderRefuseOrder(this.order.guid).then(
          (response) => {$state.transitionTo('ordersList', {status : 2}, {reload: true})}
        )
      },
      (reject) => {}
    )
  }


  //Добавить в пак
  this.addToPack = function () {
    this.order.packId = this.currentPack.id;
  }


  //Убрать из пака
  this.removeFromPack = function () {
    delete this.order.packId;
  }


  //Обработчик успешного выпонения команды
  function resolve(activeTab){
    if(activeTab){
      Object.assign($stateParams, {activeTab : activeTab})
    }

    $state.transitionTo($state.current.name, $stateParams, {reload: true});
  }


  this._init = function () {
    //для логиста
    if (this._userType === 'logist') {
      if (this.orderStatus === 'FORMED'){
        if(this._viewMode === 'detail'){
          this.orderAcceptTime = new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + 1, this.now.getHours(), this.now.getMinutes());

          //Список перевозчиков
          if (!this.forwardersList) {
            ForwardersService.getForwarders().then((response) => this.forwardersList = response.data);
          }
        }
      }
    }

    //для перевозчика
    if (this._userType === 'forwarder') {
      if (this.orderStatus === 'FORMED'){
        if(this._viewMode === 'detail'){
          //список водителей
          if (!this.driversList) {
            DriversService.getDriversList().then((response) => this.driversList = response.data);
          }

          //список машин
          if (!this.vehicleList) {
            VehicleService.getVehicleList().then((response) => this.vehicleList = response.data);
          }

          //список полуприцепов
          if (!this.semitrailersList) {
            VehicleService.getSemitrailerList().then((response) => this.semitrailersList = response.data);
          }
        }
      }
    }

    //для оператора
    if (this._userType === 'operator') {
      if (this.auctionStatus === 'PENDING'){
        //значение по-умолчанию для начальной ставки
        this.order.auction.startingBid = this.order.transportation_cost;
      }
    }
  }


  this._compileTemplate = function(){
    let template;

    if (this._userType === 'logist') {
      if (this._viewMode === 'preview') {
        if (this.orderStatus === 'FORMED') {
          template = require('./templates/logist/preview/formed.html');
        } else if (this.orderStatus === 'INWORK') {
          template = require('./templates/logist/preview/inwork.html');
        }
      } else if (this._viewMode === 'detail') {
        if (this.orderStatus === 'FORMED') {
          template = require('./templates/logist/detail/formed.html');
        } else if (this.orderStatus === 'INWORK') {
          template = require('./templates/logist/detail/inwork.html');
        }
      }
    } else if (this._userType === 'forwarder') {

      if (this._viewMode === 'preview') {
        if (this.orderStatus === 'FORMED') {
          template = require('./templates/forwarder/preview/formed.html');
        } else if (this.orderStatus === 'INWORK') {
          template = require('./templates/forwarder/preview/inwork.html');
        }
      } else if (this._viewMode === 'detail') {
        if (this.orderStatus === 'FORMED') {
          template = require('./templates/forwarder/detail/formed.html');
        } else if (this.orderStatus === 'INWORK') {
          template = require('./templates/logist/detail/inwork.html');
        }
      }
    } else if (this._userType === 'operator') {

      if (this._viewMode === 'preview') {
        if (this.auctionStatus === 'PENDING') {
          template = require('./templates/operator/preview/pending.html');
        } else {
          template = require('./templates/operator/preview/preview.html');
        }

      } else if (this._viewMode === 'detail') {
        template = require('./templates/operator/detail/detail.html');
      }
    }


    let compileTemplate = $compile(angular.element(template))($scope);
    $element.empty().append(compileTemplate);
  }
}
