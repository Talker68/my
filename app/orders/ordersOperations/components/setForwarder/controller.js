"use strict";

export default function (OrdersService, ForwardersService, $rootRouter, $q) {

  //получаем guid заказа из параметра и сам заказ
  this.$routerOnActivate = function(next, previous) {
    this.orderGuid = next.params.guid;
    this.now = new Date();

    return $q.all(
      {
        order : OrdersService.getOrderByGuid(next.params.guid),
        forwarders : ForwardersService.getForwarders()
      }
    ).then(
      (response) => {
        this.order  = response.order.data;
        this.forwardersList = response.forwarders.data;
      }
    )
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
      (response) => {console.log(response.data)}
    )
  }

  
}