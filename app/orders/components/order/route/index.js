'use strict';

import template from './template.html';
import controller from './controller';

export default {
  bindings : {
    resolve : '<',
    close : '&'
  },
  controller: controller,
  controllerAs : 'routeCtrl',
  template: template
}