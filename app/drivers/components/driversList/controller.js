"use strict";

export default function(DriversService){
  this.$onInit = function(){
    //получаем список автомобилей
    DriversService.getDriversList().then((response) => {this.driversList = response.data});
  }
  
}