"use strict";
 
export default function (VehicleService, ApiService) {
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

  // удаление полуприцепа
  this.removeSemitrailer = function () {
      return VehicleService.removeSemitrailer( this.semitrailer ).then(
          (response) => {
              debugger;
              let index = ApiService.getIndexById(this.semitrailersList, {fieldName : 'guid', value : this.semitrailer.guid });
              this.semitrailersList.splice(index,1);
          }
      )
  };
  
  this.remove = function () {
  }
}