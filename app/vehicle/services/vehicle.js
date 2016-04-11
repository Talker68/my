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

  this.removeVehicle = function (vehicleGuid) {
    return $http.delete(`/logistics/vehicle/${vehicleGuid}`);
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


}
