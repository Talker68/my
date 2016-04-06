"use strict";

export default function(ForwardersService){
  ForwardersService.getVehicleList().then(
    (response) => {
      console.log(response);
    }
  )
}