"use strict";
import routeConfig  from  './routeConfig';
import template from './template.html'
export default {
  $routeConfig : routeConfig,
  template : template,
  consrollerAs : 'vehicleCtrl',
  controller : function () {
    this.test = 'ff';
  }
}