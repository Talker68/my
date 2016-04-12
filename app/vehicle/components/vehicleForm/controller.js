"use strict";

export default function (VehicleService) {
  
  
  this.submit = function(){

    if(this.vehicle.guid){
      this.updateVehicle({vehicle : this.vehicle}).catch((error) => {
        this.error = error.message;
      })
    } else {
      this.addVehicle({vehicle : this.vehicle}).catch((error) => {
        this.error = error.message;
      })
    }
  }


}