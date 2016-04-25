"use strict";

export default function ($rootRouter, OrdersService, VehicleService , DriversService, $q) {

  //получаем guid заказа из параметра и сам заказ
  this.$routerOnActivate = function(next, previous) {
    this.orderGuid = next.params.guid;
    
    return $q.all(
      {
        drivers : DriversService.getDriversList(),
        vehicle : VehicleService.getVehicleList(),
        semitrailer: VehicleService.getSemitrailerList()
      }
    ).then(
      (response) => {
        this.driversList = response.drivers.data;
        this.vehicleList = response.vehicle.data;
        this.semitrailersList = response.semitrailer.data;
      }
    )
  };
  
  this.submit = function(){
    let options = {
      orderGuid : this.orderGuid,
      driverGuid : this.driver.guid,
      vehicleGuid : this.vehicle.guid,
      semitrailerGuid : this.semitrailer.guid
    }

    OrdersService.forwaderConfirmOrder(options).then(
      (response) => {
        console.log(response);
        $rootRouter.navigate(['Orders', 'OrdersList', {status : 3}])
      }

    )
  }


}