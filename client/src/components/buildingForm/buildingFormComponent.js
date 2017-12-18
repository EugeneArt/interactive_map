angular
  .module('app')
  .component('buildingFormComponent', {
    templateUrl: '/src/components/buildingForm/buildingFormView.html',
    bindings: {
        building: '<'
    },
    controller: buildingFormComponentController
  });

function buildingFormComponentController() {

  var vm = this;
  vm.$onInit = onInit;


  function onInit() {
    vm.building.coordinate = vm.building.coordinate || {};
  }

}