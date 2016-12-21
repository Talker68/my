'use strict';

export default function($injector, $q) {
  this.responseError = (rejection) => {
    if(rejection.status >= 500){
      $injector.get('ModalService').showError("Ошибка сервера");
    }
    return $q.reject(rejection)
  }
}



