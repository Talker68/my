"use strict";

export default function (VehicleService, ApiService) {
  VehicleService.getSemitrailerList().then(
    (result) => {
      this.semitrailersList = result.data;
    }
  );

  this.addSemitrailer = function (semitrailer) {
    return VehicleService.addSemitrailer(semitrailer).then(
      (response) => {
        this.semitrailersList.push(response.data);
      }
    )
  };





}