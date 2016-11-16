"use strict";

export default function($attrs, OrdersService){
  this.$onInit = function () {
    this.auction = this.orderCtrl.order.auction;
    this.auctionStatus = OrdersService.getAuctionStatus(this.auction.status);
    this.viewMode = $attrs.viewMode;

    //this.getBidHistory();
  }


  //Cтавка в редукционе
  this.newBet = function(){
    if(!this.auctionForm.$valid){
      this.auctionForm.$setPristine();
      this.auctionForm.$setSubmitted();
    } else {

      OrdersService.newBet(this.auction.guid, this.bet)
        .then((respnose) => {
          //Если ставка меньше или равна ставке "забрать сразу", заказ удаляется из списка
          if(this.bet <= this.auction.takeNowAmount){

            if($attrs.viewMode === 'preview'){
              this.orderCtrl.remove({orderGuid : this.orderCtrl.order.guid})
            }


          } else {
            this.auction.lastBid = this.bet;
            this.auction.lastBidTime = new Date().toISOString();

            this.auction.lastMyBid = this.bet;
            this.auction.lastMyBidTime = new Date().toISOString();

            delete this.bet;
            this.auctionForm.$setUntouched();
          }

        })
    }
  }

  //Показать истроию ставок
  this.getBidHistory = function(){
    OrdersService.showBidHistory(this.auction.guid).then((response) => {
      this.bidHistory = response.data;
    })
  };


  //Скрыть историю ставок
  this.hideBidHistory = function(){
    delete this.bidHistory;
  }


  //Встать в очередь
  this.addToQueue = function () {
    OrdersService.addToQueue(this.auction.guid).then((response) => {
      this.auction.isInQueue = 1;
    })
  }


  //Выйти из очереди
  this.leaveQueue = function () {
    OrdersService.leaveQueue(this.auction.guid).then((response) => {
      this.auction.isInQueue = 0;
    })
  }


  this.showQueue = function () {
    OrdersService.showQueue(this.auction.guid).then((response) => {
      this.queue = response.data;
    });
  }
}