"use strict";

import controller from './controller';


export default {
  controller : controller,
  controllerAs : 'semitrailerCtrl',
  bindings : {
    semitrailer : '<',
    remove : '&',
    add : '&',
    update : '&'
  }
}