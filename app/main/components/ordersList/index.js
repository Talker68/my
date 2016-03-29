"use strict";

import template from './template.html';

export default {
  controllerAs : 'orderListCtrl',
  template : template,
  bindings : {
    'list' : '<',
  }
}