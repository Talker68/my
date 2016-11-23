"use strict";

export default function (OrdersService, ApiService) {
  this.$onInit = function(){

    this.now = new Date();
    this.packs = [];
    this.filters = {};

    //Получение списка заявок
    this._getAuctionOrders();

  }

  this.$onDestroy = function(){
    clearTimeout(this._refreshTimer);
  }



  this._getAuctionOrders = function() {
    let refreshTime = 15000;
    OrdersService.getAuctionOrders(OrdersService.AUCTION_STATUSES.PENDING).then(response => {


      let responseList = response.data;

      // Если в списке уже есть задания
      if (this.list && this.list.length) {

        // Сначала проверка на то что все задачи в списке еще актуальны
        for (let i = 0; i < this.list.length; i++) {
          if (!ApiService.getArrayElementByGuid(this.list[i].order.guid, responseList)) {
            console.log('DELETE');
            this.list.splice(i, 1);
          }
        }

        // Проверка на необходимость обновления существующих и добаление новых
        for (let order of response.data) {

          let auctionOrderIndex = this.list.findIndex(elem => elem.order.guid === order.guid);

          if (auctionOrderIndex === -1) {
            console.log('NEW');
            this.list.push({order: order, packId: null})
          } else if (this.list[auctionOrderIndex].order.modified !== order.modified) {
            console.log('MODIFIED');
            this.list.splice(auctionOrderIndex, 1, {order: order, packId: this.list[auctionOrderIndex].packId});
          }

        }

      } else {
        this.list = response.data.map(item => {return {order: item, packId: null}})
      }

      this._refreshTimer = setTimeout(this._getAuctionOrders.bind(this), refreshTime);

      //this._setFiltersData();
    })
  }



  this._setFiltersData = function(){
    this.loadingTypes = [];

    for(let order of this.list) {
      if (ApiService.getIndexById(this.loadingTypes, {fieldName: 'guid', value: order.forwarder.vehicle.vehicle_type.guid}) === -1) {
        this.loadingTypes.push(order.forwarder.vehicle.vehicle_type)
      }
    }
  }



  //Создание пака
  this.createPack = function() {
    this.pack.id = this.packs.length ? (this.packs[this.packs.length - 1].id + 1) : 1;
    this.packs.push(this.pack);

    this.pack = {};

    this.packForm.$setPristine();
    this.packForm.$setUntouched();
  }

  //Расформировать пак
  this.disbandPack = function () {
    for (let auctionOrder of this.list) {
      if (auctionOrder.packId === this.currentPack.id) {
        auctionOrder.packId = null;
      }
    }
  }

  //Удаление пака
  this.removePack = function () {
    this.disbandPack();
    
    this.packs.splice(this.packs.indexOf(this.currentPack), 1);
    this.activePackTab = 0;
  }


  //Запусить пак в работу
  this.sendPackToWork = function () {

    this.buttonsDisabled = true;

    let requestData =
      this.list
        .filter(auctionOrder => auctionOrder.packId === this.currentPack.id)
        .map(auctionOrder => {
          return {
            start: this.currentPack.start,
            finish: this.currentPack.finish,
            step: this.currentPack.step,
            orderGuid: auctionOrder.order.guid,
            startingBid: auctionOrder.order.auction.startingBid,
            takeNowAmount: auctionOrder.order.auction.takeNowAmount,
          }
        });


    OrdersService.createAuctionByOrdersPack(requestData).then(response => {
      this.list = this.list.filter(auctionOrder => auctionOrder.packId !== this.currentPack.id);

      this.packs.splice(this.packs.indexOf(this.currentPack), 1);
      this.activePackTab = 0;

      this.buttonsDisabled = false;
    })

  }
}