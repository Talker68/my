"use strict";

export default function(VehicleService, $state){
  this.$onInit = function(){
    //получаем список автомобилей
    VehicleService.getVehicleList().then((response) => {this.vehicleList = response.data});
  }

}