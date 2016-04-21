"use strict";

export default function (OrdersService, $rootRouter) {

  //получаем guid заказа из параметра и сам заказ
  this.$routerOnActivate = function(next, previous) {
    this.orderGuid = next.params.guid;
    this.order = next.routeData.order;
    this.forwardersList = next.routeData.forwarders;
    this.now = new Date();
  }


  //установка транспортной компании для заявки
  this.setFrowarder = function(forwarderGuid, orderAcceptTime){
    return OrdersService.logistSetsForwarder(this.orderGuid, {forwarderGuid : forwarderGuid, orderAcceptTime : orderAcceptTime}).then(
      (response) => {
        $rootRouter.navigate(['Orders', 'OrdersList']);
      }
    )
  };


  //создание аукциона
  this.createAuction = function () {
    let auction = this.auction;
    auction.orderGuid = this.orderGuid;

    OrdersService.createAuction(auction).then(
      (response) => {response.data}
    )
  }

  
}