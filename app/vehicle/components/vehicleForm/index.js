"use strict";

import controller from './controller';
import template from './template.html';

export default {
  controller : controller,
  controllerAs : 'vehicleFormCtrl',
  template : template,
  bindings : {
    vehicle : '<',
    loadingTypes : '<',
    addVehicle : '&',
    removeVehicle : '&',
    updateVehicle : '&'
  }
}