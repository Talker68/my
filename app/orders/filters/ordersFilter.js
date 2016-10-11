"use strict";

export default function () {
  return function(items, filters){
    let result = items;

    //Фильтр по номеру документа
    if (filters.id){
      let idRegexp = new RegExp(filters.id, 'i');

      result = result.filter((item) => {
        return idRegexp.test(item.id)
      })
    }

    //Фильтр по дате погрузки
    if (filters.routeStartDate){
      result = result.filter((item) => {
        return filters.routeStartDate <= new Date(item.route.warehouse.datetitme)
      })
    }

    //Фильтр по месту погрузки
    if (filters.warehouseAddress){
      let idRegexp = new RegExp(filters.warehouseAddress, 'i');

      result = result.filter((item) => {
        return idRegexp.test(item.route.warehouse.address)
      })
    }

    //Фильтр по месту отгрузки
    if (filters.unloadingAddress){
      let idRegexp = new RegExp(filters.unloadingAddress, 'i');

      result = result.filter((item) => {
        return idRegexp.test(item.route.to.address)
      })
    }

    //Фильтр по номеру машины
    if (filters.vehiclePlateNumber){
      let idRegexp = new RegExp(filters.vehiclePlateNumber, 'i');

      result = result.filter((item) => {
        return idRegexp.test(item.forwarder.vehicle.plate_number)
      })
    }

    //Фильтр по машине
    if (filters.vehicle){
      result = result.filter((item) => {
        return item.forwarder.vehicle.guid === filters.vehicle.guid;
      })
    }

    //Фильтр по полуприцепу
    if (filters.semitrailer){
      result = result.filter((item) => {
        return item.forwarder.semitrailer.guid === filters.semitrailer.guid;
      })
    }

    //Фильтр по номеру машины
    if (filters.semitrailerPlateNumber){
      let idRegexp = new RegExp(filters.semitrailerPlateNumber, 'i');

      result = result.filter((item) => {
        return idRegexp.test(item.forwarder.semitrailer.plate_number)
      })
    }

    //Фильтр по ФИО водителя
    if (filters.driverFullName){
      let idRegexp = new RegExp(`${filters.driverFullName}`, 'i');

      result = result.filter((item) => {
        return idRegexp.test(item.forwarder.driver.full_name);
      })
    }

    //Фильтр по ФИО водителя
    if (filters.driver){
      result = result.filter((item) => {
        return item.forwarder.driver.guid === filters.driver.guid;
      })
    }


    //Фильтр по ТК
    if (filters.forwarder){
      result = result.filter((item) => {
        return item.forwarder.guid === filters.forwarder.guid;
      })
    }

    //Фильтр по Типу ТС
    if (filters.loadingType){
      result = result.filter((item) => {
        return item.forwarder.vehicle.vehicle_type.guid === filters.loadingType.guid;
      })
    }

    return result;
  }
}