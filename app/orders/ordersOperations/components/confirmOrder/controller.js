"use strict";

export default function ($rootRouter, OrdersService) {

  //получаем guid заказа из параметра и сам заказ
  this.$routerOnActivate = function(next, previous) {
    this.orderGuid = next.params.guid;
    this.driversList = next.routeData.drivers;
    this.vehicleList = next.routeData.vehicle;
    this.semitrailersList = next.routeData.semitrailersList;
  };
  
  this.submit = function(){
    let options = {
      orderGuid : this.orderGuid,
      driverGuid : this.driver.guid,
      vehicleGuid : this.vehicle.guid,
      semitrailerGuid : this.semitrailer.guid
    }

    OrdersService.forwaderConfirmOrder(options).then(
      (response) => {console.log(response)}
    )
  }


}