"use strict";

import template from  './template.html';
import controller from  './controller';

export default {
  controllerAs : 'orderDetailCtrl',
  controller: controller,
  template : template,
  bindings : {
    order : '<',
  }
}