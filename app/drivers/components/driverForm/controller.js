"use strict";

export default function () {

  this.driver.license_issue = new Date(this.driver.license_issue);
  this.driver.license_valid = new Date(this.driver.license_valid);


  this.submit = function(){

    if(this.driver.guid){
      this.updateDriver({driver : this.driver})
    } else {
      this.addVehicle({driver : this.driver}).catch((error) => {
        this.error = error.message;
      })
    }
  }


}


  // .catch((error) => {
  //   this.error = error.message;
  // })