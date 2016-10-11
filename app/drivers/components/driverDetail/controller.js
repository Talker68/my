"use strict";


export default function (DriversService, $q, $compile, $scope, $element, $state, $stateParams, ModalService, ApiService) {
  let backRoute;

  this.$onInit = function(){
    if(!this.edit){
      let compileTemplate = $compile(angular.element(require('./templates/view.html')))($scope);
      $element.empty().append(compileTemplate);
    } else {

      if(!this.driver){
        this.driver = {};
      }

      this.driver.license_issue = this.driver.license_issue ?  new Date(this.driver.license_issue) : new Date();
      this.driver.license_valid = this.driver.license_valid ? new Date(this.driver.license_valid) : new Date();

      let compileTemplate = $compile(angular.element(require('./templates/form.html')))($scope);
      $element.empty().append(compileTemplate);


      //Если есть обратный маршурут
      if ($state.params.back){
        backRoute = ApiService.getBackRoute($state.params.back);
      }

    }
  }

  /**
   * Отмена редактирования
   */
  this.cancelEdit = function(){
    if(backRoute){
      $state.transitionTo(backRoute.state, backRoute)
    } else {
      if($stateParams.guid){
        $state.transitionTo('driverDetail', {guid : $stateParams.guid}, {reload : true})
      } else {
        $state.transitionTo('drivers', {}, {reload : true})
      }
    }
  }


  //Обработчик сабмита формы
  this.submit = function () {
    if(!this.driver.guid){
      _addDriver(this.driver);
    } else  {
      _updateDriver(this.driver);
    }
  }

  /**
   * Добавлние водителя
   * @param driver
   * @private
   */
  function _addDriver(driver) {
    DriversService.addDriver(driver).then(
      (response) => {
        if(backRoute){
          $state.transitionTo(backRoute.state, backRoute);
        } else {
          $state.transitionTo('driverDetail', {guid : response.data.guid})
        }
      }
    )
  }

  /**
   * Обновление водителя
   * @param driver
   * @private
   */
  function _updateDriver(driver) {
    DriversService.updateDriver(driver).then(
      (response) => {$state.transitionTo('driverDetail', {guid : response.data.guid})}
    )
  }




  /**
   * Удаление водителя
   */
  this.removeDriver = function () {

    let modalInstance = ModalService.showConfirm(`Удалить водителя ?`);

    modalInstance.result.then(
      (response) => {
        DriversService.removeDriver(this.driver).then(
          (response) => {$state.transitionTo('drivers', {}, {reload : true})},
          (error) => {alert('Ошибка!')}
        )
      },
      (reject) => {}
    )

  }

}