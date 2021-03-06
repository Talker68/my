"use strict";

import controller from './controller';
import template from './template.html';

export default {
  controller: controller,
  controllerAs: 'orderCtrl',
  template: template,

  bindings: {
    orderData: '<',
    remove: '&',
    currentPack: '<'
  }
};
