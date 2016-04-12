"use strict";

export default function ($rootRouter, DriversService) {


  //получаем guid заказа из параметра и сам заказ
  this.$routerOnActivate = function(next, previous) {
    this.orderGuid = next.params.guid;
    this.drivers = next.routeData.drivers;
    this.vehicle = next.routeData.vehicle;
  };

  this.driverFromList = true;
  this.vehicleFromList = true;


  //установка транспортной компании для заявки
  this.setFrowarder = function(forwarderGuid, orderAcceptTime){
    return OrdersService.patchOrder(orderGuid, {forwarderGuid : forwarderGuid, orderAcceptTime : orderAcceptTime}).then(
      (response) => {
        $rootRouter.navigate(['Orders', 'OrdersList']);
      }
    )
  };




}