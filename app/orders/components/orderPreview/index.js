"use strict";

import controller from './controller';

import templateLogist from './templateLogist.html';
import templateForwarder from './templateForwarder.html';

export default {
  controller : controller,
  controllerAs : 'orderPreviewCtrl',
  template : function($element , $attrs, $rootScope){
    if($rootScope.globals.currentUser.user.type === 'logist'){
      return templateLogist;
    } else if($rootScope.globals.currentUser.user.type === 'forwarder'){
      return templateForwarder;
    }
  },
  bindings : {
    order : '<'
  }
}