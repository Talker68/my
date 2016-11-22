export default function(OrdersService, ApiService, VehicleService, DriversService, ForwardersService, AuthService, $uibModal) {
  console.log('fefefe');
  this.$onInit = function() {

    this.ORDER_STATUSES = OrdersService.ORDER_STATUSES;

    //Тип пользователя
    this.userType = AuthService.getUserType();


    //Получение грузопревозчика
    if (this.orderData.forwarder && !this.orderData.forwarder.guid) {
      this.orderData.forwarder = ApiService.getArrayElementByGuid(this.orderData.forwarder, ForwardersService.forwarders).element;
    }

    //до планового времени загрузки осталось менее  24 часов
    this.deadline = parseInt((Date.parse(this.orderData.route.routePoints[0].date) - new Date().valueOf()) / 3600000) < 24 ? true : false;
  };

  //Показать маршрут
  this.showDetailRoute = function() {
    $uibModal.open({
      resolve: {
        order: () => this.orderData
      },
      component: 'orderRoute',
      size: 'lg'
    });
  };


  // Передача заявки ТК
  this.directOrder = function() {
    let modalInstance = $uibModal.open({
      resolve: {orderGuid: () => this.orderData.guid},
      component: 'orderDirectOrder',
      size: 'lg'
    });
    modalInstance.result.then(order => this.updateOrderInList({order: order}));
  }

  // ТК отказывается от заявки
  this.forwarderRefuseOrder = function() {
    let modalInstance = $uibModal.open({
      component: 'confirm',
      resolve: {confirmText: () => 'Отказаться от заявки ?'}
    })

    modalInstance.result.then(
      response => {
        OrdersService.forwarderRefuseOrder(this.orderData.guid).then(
          response => this.removeOrderFromList({orderGuid: this.orderData.guid})
        )
      }
    )
  }

  //ТК подтверждает заявку
  this.confirmOrder = function() {

    let modalInstance = $uibModal.open({
      component: 'orderConfirm',
      resolve: {
        orderGuid: () => this.orderData.guid,
        drivers: () => DriversService.getDriversList().then(response => response.data),
        vehilcelist: () => VehicleService.getVehicleList().then(response => response.data),
        semitrailers: () => VehicleService.getSemitrailerList().then(response => response.data)
      },
    })

    modalInstance.result.then(
      modalInstance.result.then(response => this.removeOrderFromList({orderGuid: this.orderData.guid}))
    )
  }


  //Передача заявки опаератору
  this.transferOrderToOperator = function() {
    let modalInstance = $uibModal.open({
      component: 'confirm',
      resolve: {confirmText: () => 'Передать заявку оператору редукционов ?'}
    })

    modalInstance.result.then(
      response => OrdersService.transferOrderToOperator(this.orderData.guid).then(
        response => this.updateOrderInList({order: response.data})
      )
    )
  }

  // Отмена передачи заявки оператору
  this.cancelTransferOrderToOperator = function() {
    let modalInstance = $uibModal.open({
      component: 'confirm',
      resolve: {confirmText: () => 'Отменить передачу заявки оператору редукционов ?'}
    })

    modalInstance.result.then(
      response => OrdersService.cancelTransferOrderToOperator(this.orderData.guid).then(
        response => this.updateOrderInList({order: response.data})
      )
    )
  }


  this.userIs = function(userType) {
    return this.userType === userType.toLowerCase();
  }

  this.getOrderStatus = function() {
    let order = this.orderData;
    if (this.userIs('logist')) {
      if (order.forwarder) return `Отправлена ${order.forwarder.title}`;
      if (order.auction) return `Передана оператору`;
    }
    return '';
  }


}
