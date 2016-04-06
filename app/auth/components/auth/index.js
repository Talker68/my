"use strict";

import template from './template.html';
import controller from './controller';

export default {
  template : template,
  controller : controller,
  controllerAs: 'authCtrl',
  bindings: { $router: '<' }
}