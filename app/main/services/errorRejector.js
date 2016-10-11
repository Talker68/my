'use strict';

export default function($injector, $q) {
  this.responseError = (rejection) => {
    // if(rejection.status >= 500){
    //   $injector.get('ModalService').showError("Ошибка сервера");
    // } else {
      if(rejection.data[0] === '<'){
        $injector.get('ModalService').showError(rejection.statusText);
      } else {
        $injector.get('ModalService').showError(rejection.data);
      }

    //}
    
    return $q.reject(rejection)
  }

  this.requestError = (rejection) => {
    if (rejection.data[0] === '<') {
      $injector.get('ModalService').showError(rejection.statusText);
    } else {
      $injector.get('ModalService').showError(rejection.data);
    }
    return $q.reject(rejection)
  }
}



