"use strict";

export default function(ForwardersService){
  ForwardersService.getDriversList().then(
    (response) => {
      console.log(response);
    }
  )
}