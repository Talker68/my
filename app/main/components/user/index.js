"use strict";

import controller from './controller';
import template from './template.html'

export default {
  bindings : {
    user : '<'
  },
  controller : controller,
  controllerAs : 'userCtrl',
  template : template
}