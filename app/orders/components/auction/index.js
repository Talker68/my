"use strict";

import controller from './controller';

import operatorPreviewTpl from './templates/operator/preview.html';
import operatorDetailTpl from  './templates/operator/detail.html';

import forwarderTpl from './templates/forwarder/template.html';


export default {
  controller : controller,
  controllerAs : 'auctionCtrl',
  template : function($attrs, AuthService){
    let userType = AuthService.getCurrentUserType();
    let viewMode = $attrs.viewMode;
    

    if (userType === 'operator') {
      return viewMode === 'preview' ? operatorPreviewTpl : operatorDetailTpl;
    } else if (userType === 'forwarder') {
      return forwarderTpl;
    }

  },

  require: {
    orderCtrl: '^order'
  },
}