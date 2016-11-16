"use strict";

export default function (OrdersService, ApiService, $scope) {
  this.$onInit = function(){


    this.now = new Date();
    this.packs = [];
    this.filters = {};

    //Получение списка заявок
    OrdersService.getAuctionOrders(2).then(response => {
      this.list = response.data;
      this._setFiltersData();
    })

    this._refresh(30000)
  }

  this.$onDestroy = function(){
    clearTimeout(this._refreshTimer);
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


  //следит за списком, отображает кнопки в паках в зависимости от packId в заявках
  $scope.$watch('packsCtrl.list', (newValue, oldValue) => {

    if(newValue){

      for (let pack of this.packs){
        pack.showButtons = false;

        for(let order of newValue){
         if(pack.id === order.packId){
           pack.showButtons = true;
           break;
         }
        }

      }
    }

  }, true)

  //Фильтр для списка заявок, отбрасывает заявки с указанным packId
  this.auctionFilter = function(value, index, array) {
    return value.packId === undefined
  }

  //Создание пака
  this.createPack = function () {

    this.pack.id = this.packs.length ? (this.packs[this.packs.length - 1].id + 1) : 1;
    this.packs.push(this.pack);

    this.pack = {};
    this.packForm.$setPristine();
    this.packForm.$setUntouched();
  }

  //Удаление пака
  this.removePack = function () {
    for (let order of this.list) {
      if (order.packId === this.currentPack.id) {
        delete order.packId;
      }
    }
    
    this.packs.splice(this.packs.indexOf(this.currentPack), 1);
    this.activePackTab = this.packs.length ? this.packs[this.packs.length - 1].id : 0;
  }

  //Расформировать пак
  this.disbandPack = function () {
    for (let order of this.list) {
      if (order.packId === this.currentPack.id) {
        delete order.packId;
      }
    }
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