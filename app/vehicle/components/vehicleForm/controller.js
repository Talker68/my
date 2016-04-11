"use strict";

export default function (VehicleService) {
  this.submit = function(){

    if(this.vehicleForm.$valid){

      if(this.vehicle.guid){
        VehicleService.updateVehicle(this.vehicle).then(
          (response) => {
            console.log(response);
          }
        )
      }

    }

  }
}