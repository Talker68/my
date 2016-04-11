"use strict";

export default function($nextInstruction, $prevInstruction, VehicleService , $q) {

  let vehiclePromise;
  if($nextInstruction.params.guid !== 'new'){
    vehiclePromise = VehicleService.getVehicle($nextInstruction.params.guid)
  } else {
    vehiclePromise = $q.resolve({});
  }

  return $q.all(
    {
      loadingTypes : VehicleService.getLoadingTypes(),
      vehicle : vehiclePromise
    }
  ).then(
    (response) => {
      $nextInstruction.routeData.loadingTypes = response.loadingTypes;
      $nextInstruction.routeData.vehicle = response.vehicle.data ? response.vehicle.data : response.vehicle
    }
  )

}