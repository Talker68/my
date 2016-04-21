"use strict";

import controller from './controller';
import template from  './template.html';
import canActivate from './canActivate';

export default {
  controller : controller,
  controllerAs : 'setForwarderCtrl',
  template : template,
  $canActivate: canActivate,
  bindings : {
    $router: '<'
  }
}