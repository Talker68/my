"use strict";

export default function (DriversService, $q) {


  this.$routerOnActivate = function(next, previous) {

    this.isEdit = false;
    this.driverToEdit = {};

    if(next.params.guid === 'new'){
      this.isEdit = true;
    }

    let driverPromise;
    if(next.params.guid !== 'new'){
      driverPromise = DriversService.getDriver(next.params.guid)
    } else {
      driverPromise = $q.resolve({});
    }

    return $q.all(
      {
        driver : driverPromise
      }
    ).then(
      (response) => {
        this.driver = response.driver.data ? response.driver.data : response.driver
      }
    )


  };


  this.edit = function(){
    this.isEdit = true;
    this.driverToEdit = angular.copy(this.driver);
  }


  this.cancelEdit = function(){
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
        this.driver = response.data;
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