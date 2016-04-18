"use strict";

export default function(){
  this.submit = function(){

    if (this.semitrailer && this.semitrailer.guid) {
      console.log('valid');
      this.update({semitrailer : this.semitrailer}).catch((error) => {this.error = error.message})
    } else {
      this.add({semitrailer : this.semitrailer}).then(
        (response) => {
          this.semitrailer = {};
        }
      ).catch((error) => {this.error = error.message})
    }

  }
}