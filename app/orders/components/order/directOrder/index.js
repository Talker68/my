"use strict";

import controller from './controller';
import template from './template.html';

export default {
  bindings : {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controllerAs : 'directOrderCtrl',
  controller : controller,
  template : template
}