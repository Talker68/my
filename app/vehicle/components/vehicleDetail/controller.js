"use strict";

export default function (VehicleService, $q) {
  this.isEdit = false;
  this.vehicleToEdit = {};

  this.$routerOnActivate = function(next, previous) {
    this.loadingTypes = next.routeData.loadingTypes;
    this.vehicle = next.routeData.vehicle;

    if(next.params.guid === 'new'){
      this.isEdit = true;
    }
  };


  this.edit = function(){
    this.isEdit = true;
    this.vehicleToEdit = angular.copy(this.vehicle);
  }


  this.cancelEdit = function(){
    this.isEdit = false;
    //если отмена из создания авто то перекидывает на список
    if(!this.vehicleToEdit.guid){
      this.$router.navigate(['VehicleList'])
    }
  }

  this.addVehicle = function (vehicle) {
    return VehicleService.addVehicle(vehicle).then(
      (response) => {this.$router.navigate(['VehicleList'])},
      (error) => {return $q.reject(error)}
    )
  }

  this.updateVehicle = function (vehicle) {
    return VehicleService.updateVehicle(vehicle).then(
      (response) => {
        this.vehicle = vehicle;
        this.isEdit = false;
      },
      (error) => {return $q.reject(error)}
    )
  }

  this.removeVehicle = function () {
    VehicleService.removeVehicle(this.vehicle).then(
      (response) => {this.$router.navigate(['VehicleList'])}
    )
  }

}