"use strict";

export default function(VehicleService, ApiService){

  //получаем список автомобилей
  VehicleService.getVehicleList().then((response) => {this.vehicleList = response.data});

  //получаем варианты отгрузки
  VehicleService.getLoadingTypes().then((response) => {this.loadingTypes = response});

  this.removeVehicle = function (vehicleGuid) {
    VehicleService.removeVehicle(vehicleGuid).then(
      (response) => {
        let vehicleIndex = ApiService.getIndexById(this.vehicleList, {fieldName : 'guid', value: vehicleGuid});
        this.vehicleList.splice(vehicleIndex, 1);
      }
    )
  }

}