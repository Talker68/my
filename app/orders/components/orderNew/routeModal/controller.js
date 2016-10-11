'use strict';

module.exports = function(orderData, $uibModalInstance) {
  this.orderData = orderData;

  this.close = $uibModalInstance.close;
}
