"use strict";

import modalTemplate from './modal/template.html';
import modalController from './modal/controller';

export default function($uibModal, $scope){
  this.openForwarderSelectModal = function(){
    event.stopPropagation()
    event.preventDefault();
    let modalInstance = $uibModal.open({
      animation: true,
      template: modalTemplate,
      controller : modalController,
      controllerAs: 'ForwarderSelectModalCtrl',
      bindToController : true,
      scope : $scope
    });
  }
}

