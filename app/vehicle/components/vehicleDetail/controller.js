'use strict';


export default function (VehicleService, ApiService, $uibModal, $state) {
  this.$onInit = function() {
    console.log(this);
    // Проверка значение параметра guid
    if (!this.vehicle) {
      this.vehicle = {};
      this.toEditState();
    }

    //Текущая дата для валидации
    this.now = new Date;

  }

  // Переход в состояние редактирования
  this.toEditState = function() {
    this.vehicleCopy = angular.copy(this.vehicle);
    this.editState = true;
  }

  // Переход в состояние просмотра
  this.toViewState = function() {
    this.editState = false;
  }

  //Получить текущее состояние
  this.isEdit = function() {
    return this.editState;
  }

  // При смене типа отгрузки устанавливаются связаные элементы формы
  this.loadingTypeOnChange = function() {
    if (this.vehicleCopy.loadingType) {
      this.vehicleCopy.capacity = this.vehicleCopy.loadingType.capacity;
      this.vehicleCopy.volume = this.vehicleCopy.loadingType.volume;
    }
  }

  // Обработчик сабмита формы
  this.submit = function() {
    this.vehicleCopy.loadingType = this.vehicleCopy.loadingType.guid;
    if (this.vehicleCopy.guid) {
      this._updateVehicle(this.vehicleCopy)
    } else {
      this._addVehicle(this.vehicleCopy)
    }
  }

  // Удаление ТС
  this.removeVehicle = function() {
    let modalInstance = $uibModal.open({
      component: 'confirm',
      resolve: {confirmText: () => 'Удалить ТС?'}
    });

    modalInstance.result.then(
      response => VehicleService.removeVehicle(this.vehicle.guid).then(response => $state.go('^', {}, {reload: '^'}))
    )
  }

  // Добавление ТС
  this._addVehicle = function(vehicle) {
    VehicleService.addVehicle(vehicle).then(response => $state.go('^', {}, {reload: '^'}))
  }

  // Обновление ТС
  this._updateVehicle = function(vehicle) {
    console.log(vehicle);
    VehicleService.updateVehicle(vehicle).then(response => {
      this.vehicle = response.data;
      this.toViewState();
    })
  }
}