"use strict";

export default function (DriversService, $q) {
  this.isEdit = false;

  this.$routerOnActivate = function(next, previous) {

    this.driver = next.routeData.driver;

    if(next.params.isEdit || next.params.guid === 'new'){
      this.isEdit = true;
    }
  };


  this.addDriver = function (vehicle) {
    return DriversService.addDriver(vehicle).then(
      (response) => {this.$router.navigate(['DriversList'])},
      (error) => {return $q.reject(error)}
    )
  }

  this.updateDriver = function (driver) {

    console.log(driver);

    return DriversService.updateDriver(driver).then(
      (response) => {this.$router.navigate(['DriversList'])},
      (error) => {return $q.reject(error)}
    )
  }

}