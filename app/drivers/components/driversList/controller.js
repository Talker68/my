"use strict";

export default function(DriversService, ApiService){

  //получаем список автомобилей
  DriversService.getDriversList().then((response) => {this.driversList = response.data});



  // this.removeDriver = function (vehicleGuid) {
  //   VehicleService.removeVehicle(vehicleGuid).then(
  //     (response) => {
  //       let vehicleIndex = ApiService.getIndexById(this.vehicleList, {fieldName : 'guid', value: vehicleGuid});
  //       this.vehicleList.splice(vehicleIndex, 1);
  //     }
  //   )
  // }

}