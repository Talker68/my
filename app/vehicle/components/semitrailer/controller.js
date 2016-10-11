"use strict";


export default function (VehicleService, $compile, $attrs, $element, $scope) {
  this.$onInit = function(){
    let template;

    if ($attrs.viewMode === 'edit') {
      this.edit();
    } else if ($attrs.viewMode === 'view') {
      _viewMode();
    }


  }

  
  this.submit = function () {
    if (!this.copyToEdit.guid) {
      this.add({semitrailer : this.copyToEdit}).then(
        (response) => {this.copyToEdit = {}},
        (error) => {this.error = error;}
      )
    } else {
      this.update({semitrailer : this.copyToEdit}).then(
        (response) => {
          _viewMode()
        }
      )
    }
  }


  this.edit = function(){
    this.copyToEdit = angular.copy(this.semitrailer);
    _editMode()

  };

  this.cancelEdit = function(){
    _viewMode()
  };


  function _editMode() {
    let template = require('./templates/form.html');
    let templateAng = angular.element(template);
    let compileTemplate = $compile(templateAng)($scope);
    $element.empty().append(compileTemplate);
  }


  function _viewMode() {
    let template = require('./templates/view.html');
    let templateAng = angular.element(template);
    let compileTemplate = $compile(templateAng)($scope);
    $element.empty().append(compileTemplate);
  }


}