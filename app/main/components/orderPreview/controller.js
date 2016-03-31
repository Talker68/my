"use strict";

import modalTemplate from './setForwardersModal/template.html';
import modalController from './setForwardersModal/controller';

export default function($uibModal, $scope){

  this.openForwarderSelectModal = function(){

    let modalInstance = $uibModal.open({
      animation: true,
      template: modalTemplate,
      controller : modalController,
      controllerAs: 'ForwarderSelectModalCtrl',
      scope : $scope
    });
  }
  
  
}





// Планируется = 0
// Формируется = 1 // отсюда начинается
// КПогрузке = 2 // гп в исполении
// Отправлено = 3
// Закрыто = 4
