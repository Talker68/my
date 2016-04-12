"use strict";

export default function(DriversService, ApiService){
  //получаем список автомобилей
  DriversService.getDriversList().then((response) => {this.driversList = response.data});


}