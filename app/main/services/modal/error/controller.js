'use strict';

export default function($uibModalInstance, errorText){
  

  this.errorText = errorText;

  this.ok = function(){$uibModalInstance.close('ОК')}

}