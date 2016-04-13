"use strict";

export default function ($rootRouter, DriversService) {

  //получаем guid заказа из параметра и сам заказ
  this.$routerOnActivate = function(next, previous) {
    this.orderGuid = next.params.guid;
    this.driversList = next.routeData.drivers;
    this.vehicleList = next.routeData.vehicle;
  };
  
  this.submit = function(){
    console.log(this);
  }


}