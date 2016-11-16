"use strict";

export default function($stateProvider){
  $stateProvider
    .state('drivers', {
      parent: "app",
      url : 'drivers',
      resolve: {
        drivers : DriversService => DriversService.getDriversList().then(response => response.data)
      },
      component : 'driversList'
    })
    .state('driverDetail', {
      parent: "drivers",
      url : '/:guid',
      resolve :  {
        driver : ($stateParams, DriversService, ApiService) => {
          if (!ApiService.isAddNewState($stateParams.guid)) {
            return DriversService.getDriver($stateParams.guid).then(response => response.data);
          }
          return false;
        }
      },
      component: 'driverDetail'

    })

}