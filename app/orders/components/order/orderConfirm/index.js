"use strict";

import controller from './controller';
import template from  './template.html';

export default {
  bindings : {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller : controller,
  controllerAs : 'confirmOrderCtrl',
  template : template
}