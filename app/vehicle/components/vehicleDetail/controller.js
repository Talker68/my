"use strict";


export default function (VehicleService, ApiService, $compile, $element, $scope, ModalService, $state, $stateParams) {
  let backRoute;

  this.$onInit = function(){
    this.currentYear = new Date().getFullYear();
    this.now = new Date;

    if(!this.edit){
      let compileTemplate = $compile(angular.element(require('./templates/view.html')))($scope);
      $element.empty().append(compileTemplate);
    } else {

      if(!this.vehicle){
        this.vehicle = {};
        this.vehicle.year = this.now.getFullYear();
      }

      let compileTemplate = $compile(angular.element(require('./templates/form.html')))($scope);
      $element.empty().append(compileTemplate);
    }


    //Если есть обратный маршурут
    if ($state.params.back){
      backRoute = ApiService.getBackRoute($state.params.back);
    }


    this.vehicle.vehicleType = 'truck';
  }



  /**
   * Отмена редактирования
   */
  this.cancelEdit = function(){
    if(backRoute){
      $state.transitionTo(backRoute.state, backRoute)
    } else {
      if($stateParams.guid){
        $state.transitionTo('vehicleDetail', {guid : $stateParams.guid}, {reload : true})
      } else {
        $state.transitionTo('vehicleList', {}, {reload : true})
      }
    }
  }


  this.setTractorVehicleType = function () {

      delete this.vehicle.loading_type;
      delete this.vehicle.capacity;
      delete this.vehicle.volume;

  }

  /**
   * При смене типа отгрузки
   */
  this.loadingTypeOnChange = function () {
    if (this.vehicle.loading_type) {
      this.vehicle.capacity = this.vehicle.loading_type.capacity ? this.vehicle.loading_type.capacity : 0;
      this.vehicle.volume = this.vehicle.loading_type.volume ? this.vehicle.loading_type.volume : 0;
    }
  }


  //Обработчик формы
  this.submit = function () {
    if(this.vehicle.guid){
      this._updateVehicle(this.vehicle)
    } else {
      this._addVehicle(this.vehicle)
    }
  }



  /**
   * Удаление ТС
   */
  this.removeVehicle = function () {

    let modalInstance = ModalService.showConfirm(`Удалить ТС ?`);

    modalInstance.result.then(
      (response) => {
        VehicleService.removeVehicle(this.vehicle).then(
          (response) => {$state.transitionTo('vehicleList', {}, {reload : true})},
          (error) => {alert('Ошибка!')}
        )
      },
      (reject) => {}
    )

  }

  /**
   * Добавление ТС
   * @param vehicle
   * @private
   */
  this._addVehicle = function(vehicle) {
    VehicleService.addVehicle(vehicle).then((response) => {
      if(backRoute){
        $state.transitionTo(backRoute.state, backRoute);
      } else {
        $state.transitionTo('vehicleList', {}, {reload : true})
      }
    })
  }


  /**
   * Обновление ТС
   * @param vehicle
   * @returns {*|Promise.<TResult>}
   * @private
   */
  this._updateVehicle = function(vehicle){
    return VehicleService.updateVehicle(vehicle).then((response) => {$state.transitionTo('vehicleDetail', {guid : response.data.guid}, {reload : true})})
  }




}