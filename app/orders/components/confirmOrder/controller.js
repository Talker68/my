"use strict";

export default function ($rootRouter, DriversService) {

  //получаем guid заказа из параметра и сам заказ
  this.$routerOnActivate = function(next, previous) {
    this.orderGuid = next.params.guid;
    this.driversList = next.routeData.drivers;
    this.vehicleList = next.routeData.vehicle;
    this.loadingTypes = next.routeData.loadingTypes;
  };

  this.driverFromList = true;
  this.vehicleFromList = true;


  this.test = function () {
    alert('fefe');
  }

  this.submit = function(){
    console.log(this);
  }

  //
  // //установка транспортной компании для заявки
  // this.setFrowarder = function(forwarderGuid, orderAcceptTime){
  //   return OrdersService.patchOrder(orderGuid, {forwarderGuid : forwarderGuid, orderAcceptTime : orderAcceptTime}).then(
  //     (response) => {
  //       $rootRouter.navigate(['Orders', 'OrdersList']);
  //     }
  //   )
  // };




}