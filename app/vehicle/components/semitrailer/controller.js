"use strict";


export default function (VehicleService) {
  this.$onInit = function(){
    if (!this.semitrailer) {
      this.semitrailer = {};
      this.toEditState();
    }
  }

  // Сабмит формы
  this.submit = function () {
    if (!this.copyToEdit.guid) {
      // добавление полуприцепа
      VehicleService.addSemitrailer(this.copyToEdit).then(response => {
        this.copyToEdit = {};
        this.addSemitrailerToList({semitrailer : response.data})
      })
    } else {
      // обновление полуприцепа
      VehicleService.updateSemitrailer(this.copyToEdit).then(response => {
        this.toViewState();
        this.updateSemitrailerInList({semitrailer : response.data})
      })
    }
  }



  // Переход в состояние редактирования
  this.toEditState = function() {
    this.copyToEdit = angular.copy(this.semitrailer);
    this.isEditState = true;
  }

  // Переход в состояние просмотра
  this.toViewState = function() {
    this.copyToEdit = {};
    this.isEditState = false;
  }

  // Получение текущего состояния
  this.isEdit = function() {
    return this.isEditState;
  }

}