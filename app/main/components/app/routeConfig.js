"use strict";

export default [
  {path: '/enter', name: 'Auth', component: 'auth', useAsDefault: true},
  {path: '/orders/...', name: 'Orders', component: 'orders'}
]