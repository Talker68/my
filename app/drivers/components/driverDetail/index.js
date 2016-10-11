"use strict";

import controller from './controller';

export default {
  controller : controller,
  controllerAs: 'driverCtrl',
  bindings : {
    driver : '<',
    edit : '<'
  }
}