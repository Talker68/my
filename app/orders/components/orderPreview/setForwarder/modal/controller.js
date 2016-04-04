"use strict";

export default function($uibModalInstance, ForwardersService){

  ForwardersService.getForwarders().then(
    (response) => {
      this.forwardersList = response.data;
    }
  );

  this.selectForwarder = function(forwarderGuid, orderAcceptTime){
    //метод передается с помощью $scope и bindToController
    this.setForwarderCtrl.setForwarder({forwarderGuid : forwarderGuid, orderAcceptTime : orderAcceptTime}).then(
      (response) => {
        $uibModalInstance.close();
      },
      (error) => {
        this.error = error;
      }
    )
  }

}