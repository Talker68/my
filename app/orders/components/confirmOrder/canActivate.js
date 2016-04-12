"use strict";

export default function($nextInstruction, $prevInstruction, VehicleService , DriversService, $q) {

  return $q.all(
    {
      drivers : DriversService.getDriversList(),
      vehicle : VehicleService.getVehicleList()
    }
  ).then(
    (response) => {
      $nextInstruction.routeData.drivers = response.drivers.data;
      $nextInstruction.routeData.vehicle = response.vehicle.data;
    }
  )

}