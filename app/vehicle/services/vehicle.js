"use strict";

export default function($http, $rootScope, ApiService) {
  this.getVehicleList = function() {
    return $http.get(`${REQUEST_PREFIX}/vehicle`);
  }

  this.getVehicle = function(guid) {
    return $http.get(`${REQUEST_PREFIX}/vehicle/${guid}`);
  }

  this.updateVehicle = function(vehicle){
    vehicle.loading_type = vehicle.loading_type.guid;
    return $http.put(`${REQUEST_PREFIX}/vehicle/${vehicle.guid}`, vehicle)
  }

  this.addVehicle = function (vehicle) {
    if(vehicle.loading_type){
      vehicle.loading_type = vehicle.loading_type.guid;
    }
    return $http.post(`${REQUEST_PREFIX}/vehicle`, vehicle);
  }

  this.removeVehicle = function (vehicle) {
    return $http.delete(`${REQUEST_PREFIX}/vehicle/${vehicle.guid}`);
  }

  // Получение типов отгрузки
  this.getLoadingTypes = function() {
    return $http.get(`${REQUEST_PREFIX}/loading_type`);
  }

  this.setLoadingTypes = function(loadingTypes) {
    $rootScope.loadingTypes = loadingTypes;
  }

  this.getLoadingTypeByGuid = function(guid) {
    return ApiService.getArrayElementByGuid(guid, $rootScope.loadingTypes);
  }

  this.getSemitrailerList = function () {
    return $http.get(`${REQUEST_PREFIX}/semitrailer`);
  }

  this.getSemitrailer = function (guid) {
    return $http.get(`${REQUEST_PREFIX}/semitrailer/${guid}`)
  }

  this.updateSemitrailer = function(semitrailer){
    return $http.put(`${REQUEST_PREFIX}/semitrailer/${semitrailer.guid}`, semitrailer)
  }

  this.addSemitrailer = function (semitrailer) {
    return $http.post(`${REQUEST_PREFIX}/semitrailer`, semitrailer);
  }

  this.removeSemitrailer = function (semitrailer) {
    return $http.delete(`${REQUEST_PREFIX}/semitrailer/${semitrailer.guid}`);
  }


}
