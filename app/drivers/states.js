"use strict";

export default function($stateProvider){
  $stateProvider
    .state('drivers', {
      parent: "company",
      url : '/drivers',
      template : '<ui-view><drivers-list></drivers-list></ui-view>'
    })
    .state('driverDetail', {
      parent: "drivers",
      url : '/:guid?edit&back',
      resolve :  {
        driver : function ($stateParams, DriversService) {
          if($stateParams.guid){
            return DriversService.getDriver($stateParams.guid).then((response) => {return response.data} )
          }
        }
      },
      controller : function($stateParams, driver){
        this.edit = !!$stateParams.edit;
        this.driver = driver;
      },
      controllerAs : 'driverDetailStateCtrl',
      template : "<driver-detail driver='driverDetailStateCtrl.driver' edit='driverDetailStateCtrl.edit'></driver-detail>"

    })

}