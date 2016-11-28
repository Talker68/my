"use strict";

import controller from './controller';
import template from './template.html';
import templateMini from './template_mini.html';

export default {
  controller: controller,
  controllerAs: 'orderCtrl',
  template: $attrs => $attrs.template === 'mini' ? templateMini : template,

  bindings: {
    orderData: '<',
    removeOrderFromList: '&',
    updateOrderInList: '&'
  }
};
