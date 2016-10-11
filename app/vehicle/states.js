"use strict";

export default function($stateProvider){
  $stateProvider
    .state('vehicleList', {
      parent: "app",
      url : 'vehicle',
      resolve : {
        loadingTypes : function (VehicleService) {
          //получаем варианты отгрузки
          return VehicleService.getLoadingTypes().then((response) => {return response.data});
        }
      },
      controllerAs : 'vehicleListStateCtrl',
      controller : function(loadingTypes){
        this.loadingTypes = loadingTypes;
      },
      template : '<ui-view><vehicle-list loading-types="vehicleListStateCtrl.loadingTypes"></vehicle-list></ui-view>'
    })

    .state('vehicleDetail', {
      parent: "vehicleList",
      url : '/:guid?edit&back',
      resolve :  {
        vehicle : function ($stateParams, VehicleService) {
          if($stateParams.guid){
            return VehicleService.getVehicle($stateParams.guid).then((response) => {return response.data} )
          }
        }

      },
      controller : function($stateParams, vehicle, loadingTypes){
        this.edit = !!$stateParams.edit;
        this.vehicle  = vehicle;
        this.loadingTypes = loadingTypes;
      },
      controllerAs : 'vehicleDetailStateCtrl',
      template : "<vehicle-detail vehicle='vehicleDetailStateCtrl.vehicle' edit='vehicleDetailStateCtrl.edit' loading-types='vehicleDetailStateCtrl.loadingTypes'></vehicle-detail>"
    })

    .state('semitrailers', {
      parent : "app",
      url : "semitrailers?back",
      template : "<semitrailer-list></semitrailer-list>"
    })

    .state('trailersList', {
      parent : "app",
      url : 'trailers',
      resolve : {
        loadingTypes : function (VehicleService) {
          //получаем варианты отгрузки
          return VehicleService.getLoadingTypes().then((response) => {return response.data});
        }
      },
      controllerAs : 'trailersListStateCtrl',
      controller : function(loadingTypes){
        this.loadingTypes = loadingTypes;
      },
      template : '<ui-view><trailers-list loading-types="trailersListStateCtrl.loadingTypes"></trailers-list></ui-view>'
    })

    .state('trailerDetail', {
      parent: "trailersList",
      url : '/:guid?edit&back',
      resolve :  {
        trailer : function ($stateParams, VehicleService) {
          if($stateParams.guid){
            return VehicleService.getTrailer($stateParams.guid).then((response) => {return response.data})
          }
        }
      },
      controller : function($stateParams, trailer, loadingTypes){
        this.edit = !!$stateParams.edit;
        this.vehicle  = vehicle;
        this.loadingTypes = loadingTypes;
      },
      controllerAs : 'trailerDetailStateCtrl',
      template : "<trailer-detail trailer = 'trailerDetailStateCtrl.vehicle' edit = 'trailerDetailStateCtrl.edit' loading-types = 'trailerDetailStateCtrl.loadingTypes'></trailer-detail>"
    })
}