"use strict";

import controller from './controller';

export default {
  controller : controller,
  controllerAs : 'orderCtrl',
  bindings : {
    order : '=',
    remove : '&',
    //operation : '<',
    currentPack : '<'
  }


}