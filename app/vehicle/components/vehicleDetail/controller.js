'use strict';


export default function (VehicleService, ApiService, $uibModal, $state) {
  this.$onInit = function() {

    // Проверка значение параметра guid
    if (!this.vehicle) {
      this.vehicle = {};
      this.toEditState();
    }

    // получение типов отгрузки
    this.loadingTypes = VehicleService.loadingTypes;

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
    if (this.vehicleCopy.loading_type) {
      this.vehicleCopy.capacity = this.vehicleCopy.loading_type ? this.vehicleCopy.loading_type.capacity : 0;
      this.vehicleCopy.volume = this.vehicleCopy.loading_type ? this.vehicleCopy.loading_type.volume : 0;
    }
  }

  // Обработчик сабмита формы
  this.submit = function() {
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
    VehicleService.updateVehicle(vehicle).then(response => {
      this.vehicle = response.data;
      this.toViewState();
    })
  }
}