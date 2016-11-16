"use strict";

import template from './template.html';

export default {
  bindings : {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controllerAs : 'confirmCtrl',
  template : template
}