'use strict';

import template from './template.html';

export default {
  template : template,
  controller : function($rootScope){
    $rootScope.$watch('serverTime', (newValue, oldValue) => {
      this.time = newValue;
  }, true);
  },
  controllerAs : 'serverTimeCtrl'
}