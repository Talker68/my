"use strict";

export default function($nextInstruction, $prevInstruction, VehicleService , DriversService, $q, $timeout) {

  return $q.all(
    {
      drivers : DriversService.getDriversList(),
      vehicle : VehicleService.getVehicleList(),
      loadingTypes : VehicleService.getLoadingTypes()
    }
  ).then(
    (response) => {
      $nextInstruction.routeData.drivers = response.drivers.data;
      $nextInstruction.routeData.vehicle = response.vehicle.data;
      $nextInstruction.routeData.loadingTypes = response.loadingTypes;
    }
  )


}