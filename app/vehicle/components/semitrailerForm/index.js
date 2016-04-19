"use strict";

import controller from './controller';
import template from  './template.html';


export default {
  controller : controller,
  controllerAs : 'semitrailerFormCtrl',
  template : template,
  bindings : {
    semitrailer : '<',
    cancel : '&',
    update : '&',
    add : '&'
  }
}