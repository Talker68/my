'use strict';

export default function($uibModalInstance, confirmText){
  

  this.confirmText = confirmText;

  this.ok = function(){$uibModalInstance.close('ОК')}

  this.cancel = function () {
    $uibModalInstance.dismiss('CANCEL');
  };
}