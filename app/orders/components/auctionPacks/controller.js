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
    let refreshTime = 5000;
    OrdersService.getAuctionOrders(OrdersService.AUCTION_STATUSES.PENDING).then(response => {

      if (this.list && this.list.length) {

        for (let order of response.data) {

          let auctionOrderIndex = this.list.findIndex(elem => elem.order.guid === order.guid);

          if (auctionOrderIndex === -1) {
            console.log('NEW');
            this.list.push({order: order, packId: null})
          } else if (this.list[auctionOrderIndex].order.modified !== order.modified) {
            console.log('MODIFIED');
          }

        }

      } else {
        this.list = response.data.map(item => {return {order: item, packId: null}})
      }

      this._refreshTimer = setTimeout(this._getAuctionOrders.bind(this), refreshTime);

      //this._setFiltersData();
    })
  }

  this._refresh = function (refreshInterval) {
    let repeatFunc;
    this._refreshTimer = setTimeout(repeatFunc = () => {
      OrdersService.getAuctionOrders(2).then(response => {

        for(let order of response.data){
          let index = ApiService.getIndexById(this.list , {fieldName: 'guid', value: order.guid});
          if(index !== -1){
            Object.assign(this.list[index].auction, order.auction);
          } else {
            console.log('new');
            this.list.push(order);
          }

        }

        this._setFiltersData();
        this._refreshTimer = setTimeout(repeatFunc, refreshInterval);
      })

    }, refreshInterval)
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
    console.log(this);

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

    let currentPackOrders = this.list.filter((item) => {
      return item.packId === this.currentPack.id
    })

    let requestData = currentPackOrders.map((item) => {
      return {
        start: this.currentPack.start,
        finish: this.currentPack.finish,
        step: this.currentPack.step,
        orderGuid: item.guid,
        startingBid: item.auction.startingBid,
        takeNowAmount: item.auction.takeNowAmount,
      }
    });

    OrdersService.createAuctionByOrdersPack(requestData).then((response) => {
      this.list = this.list.filter((item) => {
        return item.packId !== this.currentPack.id
      })

      this.packs.splice(this.packs.indexOf(this.currentPack), 1);
      this.activePackTab = this.packs.length ? this.packs[this.packs.length - 1].id : 0;

      this.buttonsDisabled = false;
    })

  }
}