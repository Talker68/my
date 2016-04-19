"use strict";

export default function($nextInstruction, $prevInstruction, VehicleService , DriversService, $q, $timeout) {

  return $q.all(
    {
      drivers : DriversService.getDriversList(),
      vehicle : VehicleService.getVehicleList(),
      semitrailer: VehicleService.getSemitrailerList()
    }
  ).then(
    (response) => {
      $nextInstruction.routeData.drivers = response.drivers.data;
      $nextInstruction.routeData.vehicle = response.vehicle.data;
      $nextInstruction.routeData.semitrailersList = response.semitrailer.data;
    }
  )


}