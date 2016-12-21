"use strict";

export default function() {
  return {
    require: 'ngModel',
    scope : {
      auction : '<'
    },
    link: function(scope, elm, attrs, ctrl) {

      let auction = scope.auction;

      ctrl.$validators.BVrequired = function(modelValue, viewValue) {

        // /проверка на заполнение
        if (ctrl.$isEmpty(modelValue) || modelValue <= 0) {

          return false;
        }
        return true;
      }


      //ставка не должна быть больше стартового тарифа
      ctrl.$validators.BVlessStartingBid = function(modelValue, viewValue){
        if (modelValue > auction.startingBid) {
          return false;
        }
        return true;
      }

      //ставка не должна быть больше или равна последней
      ctrl.$validators.BVlessLastBid = function(modelValue, viewValue){
        let sortedBids = auction.auctionBids.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (auction.lastBid !== 0 && modelValue >= sortedBids[0].bid) {
          return false;
        }
        return true;
      }


      //кратность шагу
      ctrl.$validators.BVlmultiplicityToStep = function(modelValue, viewValue){
        if(modelValue % auction.step){
          return false;
        }
        return true;
      }

    }
  };
}
