"use strict";


export default function (DriversService, ApiService, $state, $stateParams, $uibModal) {
  this.$onInit = function() {

    if (!this.driver) {
      this.driver = {};
      this.toEditState();
    }

  }

  // Переход в состояние редактирования
  this.toEditState = function() {
    this.driverCopy = angular.copy(this.driver);
    this.driverCopy.license_issue =  this.driverCopy.license_issue ? new Date(this.driverCopy.license_issue) : new Date();
    this.driverCopy.license_valid = this.driverCopy.license_valid ? new Date(this.driverCopy.license_valid) : new Date();

    this.editState = true;
  }

  // Переход в состояние просмотра
  this.toViewState = function() {
    this.editState = false;
  }

  // Получить текущее состояние
  this.isEdit = function() {
    return this.editState;
  }


  // Обработчик сабмита формы
  this.submit = function() {
    if (this.driverCopy.guid) {
      this._updateDriver(this.driverCopy)
    } else {
      this._addDriver(this.driverCopy)
    }
  }


  // Добавление водителя
  this._addDriver = function(driver) {
    DriversService.addDriver(driver).then(response => $state.go('^', {}, {reload: '^'}))
  }

  // Обновление водителя
  this._updateDriver = function(driver) {
    DriversService.updateDriver(driver).then(response => {
      this.driver = response.data;
      this.toViewState();
    })
  }

  // Удаление водителя
  this.removeDriver = function() {
    let modalInstance = $uibModal.open({
      component: 'confirm',
      resolve: {confirmText: () => 'Удалить водителя?'}
    });

    modalInstance.result.then(
      response => DriversService.removeDriver(this.driver.guid).then(response => $state.go('^', {}, {reload: '^'}))
    )

  }

}