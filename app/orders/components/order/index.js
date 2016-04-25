"use strict";

import controller from './controller';

//шаблоны
import tplPreviewLogist from './templates/preview/logist.html';
import tplPreviewForwarder from './templates/preview/forwarder.html';
import tplDetail from './templates/detail/template.html';


export default {
  controller : controller,
  controllerAs : 'orderCtrl',
  template : function($element , $attrs, $rootScope){

    if ('preview' in $attrs){ //Если просмотр в списке
      if($rootScope.globals.currentUser.user.type === 'logist'){
        return tplPreviewLogist;
      } else if($rootScope.globals.currentUser.user.type === 'forwarder'){
        return tplPreviewForwarder;
      }     
    } else { // Если детальный просмотр
      return tplDetail;
    }
  },

  bindings : {
    orderPreview : '<',
    removeOrder : '&',
    $router : '<'
  }


}