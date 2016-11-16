"use strict";

//Подтверждение
import confirmCtrl from  './confirm/controller';
import confirmTpl from './confirm/template.html';


//Ошибка
import errorCtrl from  './error/controller';
import errorTpl from './error/template.html';


export default function ($uibModal) {

  this.showConfirm = function(confirmText) {

    return $uibModal.open({
      template: confirmTpl,
      controller: confirmCtrl,
      controllerAs: 'confirmCtrl',
      resolve : {
        confirmText : function(){
          return confirmText;
        }
      }
    });
  }

  this.showError = function(errorText) {

    return $uibModal.open({
      template: errorTpl,
      controller: errorCtrl,
      controllerAs: 'errorCtrl',
      resolve : {
        errorText : function(){
          return errorText;
        }
      }
    });
  }
}