"use strict";

export default function (DriversService, $q) {
  this.isEdit = false;
  this.driverToEdit = {};

  this.$routerOnActivate = function(next, previous) {
    this.driver = next.routeData.driver;

    if(next.params.guid === 'new'){
      this.isEdit = true;
    }
  };


  this.edit = function(){
    this.isEdit = true;
    this.driverToEdit = angular.copy(this.driver);
  }


  this.cancelEdit = function(){
    console.log('fefe');
    this.isEdit = false;
    //если отмена из создания авто то перекидывает на список
    if(!this.driverToEdit.guid){
      this.$router.navigate(['DriversList'])
    }
  }

  this.addDriver = function (driver) {
    return DriversService.addDriver(driver).then(
      (response) => {this.$router.navigate(['DriversList'])},
      (error) => {return $q.reject(error)}
    )
  }

  this.updateDriver = function (driver) {
    return DriversService.updateDriver(driver).then(
      (response) => {
        this.driver = driver;
        this.isEdit = false;
      },
      (error) => {return $q.reject(error)}
    )
  }

  this.removeDriver = function () {
    DriversService.removeDriver(this.driver).then(
      (response) => {this.$router.navigate(['DriversList'])}
    )
  }

}