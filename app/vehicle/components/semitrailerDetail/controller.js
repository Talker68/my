"use strict";
 
export default function (VehicleService) {
  this.isEdit = false;

  this.edit = function(){
    this.isEdit = true;
    this.copyToEdit = angular.copy( this.semitrailer );
  };

  this.cancelEdit = function(){
    this.isEdit = false;
  };

  // редактирование полуприцепа
  this.updateSemitrailer = function(semitrailer){
    return VehicleService.updateSemitrailer(semitrailer).then(
      (response) => {
        this.semitrailer = response.data;
        this.isEdit = false;
      }
    )
  };






}