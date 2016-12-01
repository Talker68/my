export default function(OrdersService, ApiService, VehicleService, DriversService, ForwardersService, AuthService, $uibModal, $filter) {
  this.$onInit = function() {
    this.ORDER_STATUSES = OrdersService.ORDER_STATUSES;
    this.AUCTION_STATUSES = OrdersService.AUCTION_STATUSES;
    this.USER_TYPES = AuthService.USER_TYPES;

    // Тип пользователя
    this.userType = AuthService.getUserType();

    // Для аукциона
    if (this.orderData.auction && this.orderData.auction.auctionBids && this.orderData.auction.auctionBids.length) {
      this.setBids();
    }

    // Установка строки статуса документа
    this.setOrderStringStatus();

    // До планового времени загрузки осталось менее  24 часов
    this.deadline = parseInt((Date.parse(this.orderData.route.routePoints[0].date) - new Date().valueOf()) / 3600000) < 24 ? true : false;

  };

  // Установка значений ставок для шаблона
  this.setBids = function() {

    //Сортировка истории ставок по убыванию дат
    let sortedBids = this.orderData.auction.auctionBids.sort((a, b) => new Date(b.date) - new Date(a.date));

    //Последняя ставка
    this.orderData.auction.lastBid = sortedBids[0];

    //Поиск своей последней ставки
    let lastMyBid = sortedBids.find(bid => bid.myBet === 1);
    if (lastMyBid) {
      this.orderData.auction.lastMyBid = lastMyBid;
    }

  }

  // Показать маршрут
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

  // ТК подтверждает заявку
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


  // Передача заявки опаератору
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


  // Отмена запланированного редукциона (оператор отменят заплпнированный редукцион)
  this.cancelPlannedAuction = function() {
    let modalInstance = $uibModal.open({
      component: 'confirm',
      resolve: {confirmText: () => 'Отменить заплпнированный редукцион ?'}
    })

    modalInstance.result.then(
      response => OrdersService.cancelPlannedAuction(this.orderData.auction.guid).then(
        response => this.removeOrderFromList({orderGuid: this.orderData.guid}))
    )

  }

  // Cтавка в редукционе
  this.newBet = function() {
    this.buttonsDisabled = true;

    OrdersService.newBet(this.orderData.auction.guid, this.bid).then(respnose => {
      //Если ставка меньше или равна ставке "забрать сразу", заказ удаляется из списка
      if (this.bid <= this.orderData.auction.takeNowAmount) {
        this.removeOrderFromList({orderGuid: this.orderData.guid});
      } else {
        // TODO: Заменить запрос на историю ставок
        OrdersService.getOrderByGuid(this.orderData.guid).then(respnose => {
          this.orderData.auction.auctionBids = respnose.data.auction.auctionBids;
          this.setBids();

          this.bid = '';
          this.auctionForm.$setPristine();
          this.auctionForm.$setUntouched();

          this.buttonsDisabled = false;
        })


      }
    })
  }

  // Спрятать заявку
  this.hide = function() {
    this.isHidden = true;
  }

  // Встать в очередь
  this.addToQueue = function () {
    OrdersService.addToQueue(this.orderData.auction.guid).then(response => {
      // TODO: Заменить на this.orderData.auction.positionInQueue=response.data.positionInQueue без доп запроса
      OrdersService.getOrderByGuid(this.orderData.guid).then(respnose => {
        this.orderData.auction.isInQueue = 1;
        this.orderData.auction.positionInQueue = respnose.data.auction.positionInQueue;
        this.setOrderStringStatus();
      })
    })
  }


  // Выйти из очереди
  this.leaveQueue = function () {
    OrdersService.leaveQueue(this.orderData.auction.guid).then(response => {
      this.orderData.auction.isInQueue = 0;
      this.setOrderStringStatus();
    })
  }

  // Показать очередь
  this.getQueue = function () {
    OrdersService.getQueue(this.orderData.auction.guid).then(response => {
      console.log(response);
      //this.auction.queue = response.data;
    });
  }

  // Проверка доступности кнопки
  this.showButton = function(buttonAction) {
    // Кнопки подтвердить и отказаться от заказа для ТК
    if (buttonAction === 'confirmOrder' || buttonAction === 'refuseOrder') {
      if (this.userType === this.USER_TYPES.FORWARDER) {
        if (
          (this.orderData.forwarder && (this.orderData.status === this.ORDER_STATUSES.FORMED) && !this.orderData.auction) ||
          ((this.orderData.auction.status === this.AUCTION_STATUSES.ON_CONFIRM) && (this.orderData.auction.canConfirmOrder === 1))
        ) {
          return true
        }
      }
    }

    if (buttonAction === 'toQueue') {
      if (this.userType === this.USER_TYPES.FORWARDER && this.orderData.auction && this.orderData.auction.status === this.AUCTION_STATUSES.ON_CONFIRM) {
        if (!this.orderData.auction.isInQueue && !this.orderData.auction.canConfirmOrder) {
          return true;
        }
      }
    }

    if (buttonAction === 'leaveQueue') {
      if (this.userType === this.USER_TYPES.FORWARDER && this.orderData.auction && this.orderData.auction.status === this.AUCTION_STATUSES.ON_CONFIRM) {
        if (this.orderData.auction.isInQueue && !this.orderData.auction.canConfirmOrder) {
          return true;
        }
      }
    }

    return false;
  }

  // Установка строки статуса документа
  this.setOrderStringStatus = function(value) {
    function getStatus() {
      let order = this.orderData;
      if (this.userType === this.USER_TYPES.LOGIST) {
        // TODO : изменить на forwarder.title
        if (order.forwarder) return `Отправлена ${order.forwarder}`;
        if (order.auction) return `Передана оператору`;
      } else if (this.userType === this.USER_TYPES.FORWARDER) {
        if (order.confirmOrderExpirationTime) return `Подтвердить до ${$filter('date')(order.confirmOrderExpirationTime, "dd.MM.yyyy HH:mm")}`;
        if (order.auction.isInQueue) return `Позиция в очереди ${order.auction.positionInQueue}`;
      } else if (this.userType === this.USER_TYPES.OPERATOR) {
        // TODO : Заменить на название, после перераотки формата
        if (order.forwarder) return `На подтверждении у ${order.forwarder}`;
      }
      return '';
    }

    this.orderStatusString = value ? value : getStatus.bind(this)();
  }

}
