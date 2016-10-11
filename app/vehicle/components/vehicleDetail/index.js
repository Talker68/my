"use strict";

import controller from './controller';

export default {
  controller : controller,
  controllerAs: 'vehicleCtrl',
  bindings: {
    vehicle : '<',
    edit : '<',
    loadingTypes : '<'
  }
}