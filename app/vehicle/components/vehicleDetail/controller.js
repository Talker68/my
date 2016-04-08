"use strict";

export default function (VehicleService) {
  this.isEdit = false;

  this.$routerOnActivate = function(next, previous) {;

    if(next.params.isEdit){
      this.isEdit = true;
    }

    if(next.params.guid === 'new'){
      this.vehicle = {};
      this.isEdit = true;
    }

    if(next.params.guid && next.params.guid !== 'new'){
      VehicleService.getVehicle(next.params.guid).then(
        (response) => {
          this.vehicle = response.data;
          console.log(this);
        }
      )
    }
  };
}