"use strict";

export default function(OrdersService) {

  this.confirmOrder = function(){
    let requestData = {
      driverGuid : this.driver.guid,
      vehicleGuid : this.vehicle.guid,
      semitrailerGuid : this.semitrailer ? this.semitrailer.guid : ''
    }

    OrdersService.forwaderConfirmOrder(this.resolve.orderGuid, requestData).then(response => this.close());
  }




}