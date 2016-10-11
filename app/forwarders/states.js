"use strict";

export default function($stateProvider){
  $stateProvider
    .state('company', {
      parent: "app",
      url : 'company',
      template : '<ui-view></ui-view>',
      abstract : true
    })
    .state('companySettings', {
      parent: "company",
      url : '/settings',
      template : '<company></company>'
    })

}