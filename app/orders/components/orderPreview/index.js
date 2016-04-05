"use strict";

import controller from './controller';
import template from './template.html';

export default {
  controller : controller,
  controllerAs : 'orderPreviewCtrl',
  template : template,
  bindings : {
    order : '<'
  }
}