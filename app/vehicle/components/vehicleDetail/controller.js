"use strict";

export default function (VehicleService, $q) {


  this.$routerOnActivate = function(next, previous) {

    this.isEdit = false;
    this.vehicleToEdit = {};
    

    if(next.params.guid === 'new'){
      this.isEdit = true;
    }

    let vehiclePromise;
    if(next.params.guid !== 'new'){
      vehiclePromise = VehicleService.getVehicle(next.params.guid)
    } else {
      vehiclePromise = $q.resolve({});
    }

    return $q.all(
      {
        loadingTypes : VehicleService.getLoadingTypes(),
        vehicle : vehiclePromise
      }
    ).then(
      (response) => {
        this.loadingTypes = response.loadingTypes;
        this.vehicle = response.vehicle.data ? response.vehicle.data : response.vehicle
      }
    )

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
        this.vehicle = response.data;
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