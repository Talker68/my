"use strict";

import resolve from './resolve';
import controller from './controller';

export default  {
  url: "order/:guid?activeTab",
  parent: "app",
  resolve : resolve,
  controller : controller,
  controllerAs : 'orderStateCtrl',
  template: `<order order="orderStateCtrl.order" view-mode="detail"></order>`


}
