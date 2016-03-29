"use strict";

import template from  './template.html';

export default {
  controllerAs : 'orderCtrl',
  template : template,
  bindings : {
    'order' : '<'
  }
}