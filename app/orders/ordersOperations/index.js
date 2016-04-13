"use strict";

import setForwarderComponent from './components/setForwarder'
import confirmOrderComponent from './components/confirmOrder'
import ordersOperationsComponent from './components/ordersOperations';

export default angular.module('ordersOperations', [])

  .component('ordersOperations', ordersOperationsComponent)
  .component('setForwarder', setForwarderComponent)
  .component('confirmOrder', confirmOrderComponent)
  
  .name