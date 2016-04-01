"use strict";

import template from './template.html';
import controller from './controller';

export default {
  controller : controller,
  controllerAs : 'setForwarderCtrl',
  template : template,
  bindings : {
    setForwarder : '&'
  }
}