"use strict";

export default function($http, $q, $timeout){
  this.getVehicleList = function () {
    return $http.get(`${REQUEST_PREFIX}/vehicle`);
  }

  this.getVehicle = function (guid) {
    return $http.get(`${REQUEST_PREFIX}/vehicle/${guid}`)
  }

  this.updateVehicle = function(vehicle){
    return $http.put(`${REQUEST_PREFIX}/vehicle/${vehicle.guid}`, vehicle)
  }

  this.addVehicle = function (vehicle) {
    return $http.post(`${REQUEST_PREFIX}/vehicle`, vehicle);
  }

  this.removeVehicle = function (vehicle) {
    return $http.delete(`${REQUEST_PREFIX}/vehicle/${vehicle.guid}`);
  }

  //Получение типов отгрузки
  this.getLoadingTypes = function(){
    return $http.get(`${REQUEST_PREFIX}/loading_type`).then(
      (response) => {
        let loadingTypes = Object.create(null);
        for(let type of response.data){
          loadingTypes[type.guid] = type.title;
        }

        return $q.resolve(loadingTypes);
      },
      (error) => {
        return $q.reject(error);
      }
    )
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
