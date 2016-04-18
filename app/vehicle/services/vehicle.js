"use strict";

export default function($http, $q, $timeout){
  this.getVehicleList = function () {
    return $http.get('/logistics/vehicle')
  }

  this.getVehicle = function (guid) {
    return $http.get(`/logistics/vehicle/${guid}`)
  }

  this.updateVehicle = function(vehicle){
    return $http.put(`/logistics/vehicle/${vehicle.guid}`, vehicle)
  }

  this.addVehicle = function (vehicle) {
    return $http.post('/logistics/vehicle', vehicle);
  }

  this.removeVehicle = function (vehicle) {
    return $http.delete(`/logistics/vehicle/${vehicle.guid}`);
  }

  //Получение типов отгрузки
  this.getLoadingTypes = function(){
    return $http.get('/logistics/loading_type').then(
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
    return $http.get('/logistics/semitrailer')
  }

  this.getSemitrailer = function (guid) {
    return $http.get(`/logistics/semitrailer/${guid}`)
  }

  this.updateSemitrailer = function(semitrailer){
    return $http.put(`/logistics/semitrailer/${semitrailer.guid}`, semitrailer)
  }

  this.addSemitrailer = function (semitrailer) {
    return $http.post('/logistics/semitrailer', semitrailer);
  }

  this.removeSemitrailer = function (semitrailer) {
    return $http.delete(`/logistics/semitrailer/${semitrailer.guid}`);
  }


}
