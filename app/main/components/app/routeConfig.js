"use strict";

export default [
  {path: '/enter', name: 'Auth', component: 'auth', useAsDefault: true},
  {path: '/orders/...', name: 'Orders', component: 'orders'},
  {path: '/orders-operations/...', name: 'OrdersOperations', component: 'ordersOperations'},
  {path: '/company/...', name: 'Сompany', component: 'company'},
  {path: '/vehicle/...', name: 'Vehicle', component: 'vehicle'},
  {path: '/drivers/...', name: 'Drivers', component: 'drivers'}
]