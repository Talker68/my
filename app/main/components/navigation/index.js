"use strict";

import controller from './controller';

import logistTpl from './template/logist.html';
import forwarderTpl from './template/forwarder.html';
import operatorTpl from './template/operator.html';

export default {
  template : function (AuthService) {
    console.log(AuthService);
    let userType = AuthService.getUserType();

    if (userType === 'logist'){
      return logistTpl;
    } else if (userType === 'forwarder'){
      return forwarderTpl;
    } else if (userType === 'operator'){
      return operatorTpl;
    }
  },
  controller : controller,
  controllerAs: 'navCtrl'
}