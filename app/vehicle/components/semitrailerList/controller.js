"use strict";

export default function (VehicleService, ApiService) {
  VehicleService.getSemitrailerList().then(
    (result) => {
      this.semitrailersList = result.data;
    }
  )


  this.addSemitrailer = function (semitrailer) {
    return VehicleService.addSemitrailer(semitrailer).then(
      (response) => {
        this.semitrailersList.push(response.data);
      }
    )
  }


  this.removeSemitrailer = function (semitrailer) {
    return VehicleService.removeSemitrailer(semitrailer).then(
      (response) => {
        let index = ApiService.getIndexById(this.semitrailersList, {fieldName : 'guid', value : semitrailer.guid});
        this.semitrailersList.splice(index,1);
      }
    )
  }
}