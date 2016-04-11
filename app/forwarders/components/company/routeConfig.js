"use strict";

export default [
  {path: '/', name: 'CompanyRoot', redirectTo: ['CompanySettings']},
  {path: '/settings', name: 'CompanySettings', component: 'companySettings', useAsDefault: true},

]