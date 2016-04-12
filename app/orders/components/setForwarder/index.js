"use strict";

import controller from './controller';
import template from  './template.html';

export default {
  controller : controller,
  controllerAs : 'setForwarderCtrl',
  template : template,
  bindings : {
    $router: '<'
  }
}