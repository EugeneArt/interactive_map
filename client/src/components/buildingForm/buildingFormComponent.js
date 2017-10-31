angular
  .module('app')
  .component('buildingFormComponent', {
    templateUrl: '/src/components/buildingForm/buildingFormView.html',
    bindings: {
        building: '<'
    },
    require: {
        schemeComponent: '^schemeComponent'
    },
    controller: buildingFormComponentController
  });

function buildingFormComponentController() {

  var vm = this;
  vm.$onInit = onInit;


  function onInit() {
    vm.building.coordinate = {};
  }

}