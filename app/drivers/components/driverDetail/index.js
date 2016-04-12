"use strict";

import controller from './controller';
import template from './template.html';
import canActivate from './canActivate';

export default {
  controller : controller,
  controllerAs: 'driverDetailCtrl',
  template : template,
  bindings: { $router: '<' },
  $canActivate: canActivate

}