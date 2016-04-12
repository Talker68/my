"use strict";

export default function($nextInstruction, $prevInstruction, DriversService , $q) {

  let driverPromise;
  if($nextInstruction.params.guid !== 'new'){
    driverPromise = DriversService.getDriver($nextInstruction.params.guid)
  } else {
    driverPromise = $q.resolve({});
  }

  return $q.all(
    {
      driver : driverPromise
    }
  ).then(
    (response) => {
      $nextInstruction.routeData.driver = response.driver.data ? response.driver.data : response.driver
    }
  )

}