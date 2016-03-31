"use strict";

export default [
  {path: '/auth', name: 'Auth', component: 'auth'},
  {path: '/orders/...', name: 'Orders', component: 'orders', useAsDefault: true}
]