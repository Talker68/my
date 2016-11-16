"use strict";

import controller from './controller';
import template from './template.html';

export default {
  bindings: {
    user : '<',
    loadingTypes : '<'
  },
  controllerAs: 'orderListCtrl',
  controller: controller,
  template: template
};

