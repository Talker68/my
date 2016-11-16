"use strict";

export default function (VehicleService, ApiService, $uibModal) {

  // добавление полуприцепа
  this.addSemitrailer = function (semitrailer) {
    this.semitrailersList.push(semitrailer);
  };

  // редактирование полуприцепа
  this.updateSemitrailer = function(semitrailer){
    let index = ApiService.getArrayElementByGuid(semitrailer.guid, this.semitrailersList).index;
    this.semitrailersList.splice(index, 1, semitrailer);
  };

  // удаление полуприцепа
  this.removeSemitrailer = function(semitrailer) {
    let modalInstance = $uibModal.open({
      component: 'confirm',
      resolve: {confirmText: () => 'Удалить полуприцеп ?'}
    });

    modalInstance.result.then(
      (response) => {
        VehicleService.removeSemitrailer(semitrailer.guid).then(
          response => {
            let index = ApiService.getArrayElementByGuid(semitrailer.guid, this.semitrailersList).index;
            this.semitrailersList.splice(index, 1);
          }
        )
      }
    )
  };

}