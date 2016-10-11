"use strict";


import logistTpl from './template/logist.html';
import forwarderTpl from './template/forwarder.html';
import operatorTpl from './template/operator.html';

export default {
  template : function (AuthService) {
    let currentUserType = AuthService.getCurrentUserType();

    if (currentUserType === 'logist'){
      return logistTpl;
    } else if (currentUserType === 'forwarder'){
      return forwarderTpl;
    } else if (currentUserType === 'operator'){
      return operatorTpl;
    }
  },
  controllerAs: 'navCtrl',
  controller : function(){
    this.NODE_ENV = NODE_ENV;
  }
}