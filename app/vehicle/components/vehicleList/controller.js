"use strict";

export default function(VehicleService){

  //получаем список автомобилей
  VehicleService.getVehicleList().then((response) => {this.vehicleList = response.data});

  //получаем варианты отгрузки
  VehicleService.getLoadingTypes().then((response) => {this.loadingTypes = response});

}