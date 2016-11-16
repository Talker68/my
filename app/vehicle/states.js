"use strict";

export default function($stateProvider){
  $stateProvider
    .state('vehicleList', {
      parent: "app",
      url : 'vehicle',
      component : 'vehicleList',
      resolve: {
        vehicleList : VehicleService => VehicleService.getVehicleList().then(response => response.data)
      }
    })

    .state('vehicleDetail', {
      parent: "vehicleList",
      resolve : {
        vehicle : ($stateParams, VehicleService, ApiService) => {
          if (!ApiService.isAddNewState($stateParams.guid)) {
            return VehicleService.getVehicle($stateParams.guid).then(response => response.data)
          }
          return false;
        }
      },
      url : '/:guid',
      component: 'vehicleDetail'
    })

    .state('semitrailers', {
      parent : "app",
      url : "semitrailers",
      component : "semitrailerList",
      resolve: {
        semitrailersList : VehicleService =>  VehicleService.getSemitrailerList().then(response => response.data)
      }
    })

}