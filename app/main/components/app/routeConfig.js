"use strict";

export default [
  {path: '/auth', name: 'Auth', component: 'auth', useAsDefault: true},
  {path: '/orders/...', name: 'Orders', component: 'orders'}
]