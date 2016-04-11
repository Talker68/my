"use strict";

export default function (VehicleService, $q) {
  this.isEdit = false;

  this.$routerOnActivate = function(next, previous) {
    this.loadingTypes = next.routeData.loadingTypes;
    this.vehicle = next.routeData.vehicle;

    if(next.params.isEdit || next.params.guid === 'new'){
      this.isEdit = true;
    }
  };


  this.addVehicle = function (vehicle) {
    return VehicleService.addVehicle(vehicle).then(
      (response) => {this.$router.navigate(['VehicleList'])},
      (error) => {return $q.reject(error)}
    )
  }

  this.updateVehicle = function (vehicle) {
    return VehicleService.updateVehicle(vehicle).then(
      (response) => {this.$router.navigate(['VehicleList'])},
      (error) => {return $q.reject(error)}
    )
  }

}