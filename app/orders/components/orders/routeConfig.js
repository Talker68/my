"use strict";

export default [
  {path: '/', name: 'OrdersList', component: 'ordersList', useAsDefault: true},
  {path: '/:guid', name: 'OrderDetail', component : 'orderDetail'},
  {path: '/setForwarder', name: 'SetForwarderForm', component: 'setForwarderForm'}
]